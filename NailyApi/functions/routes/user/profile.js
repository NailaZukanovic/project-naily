const { firestore, storage } = require("../../utils/firebase");
const { profileCollection } = require("../../db/collections");
const { uploadFile } = require('../../utils/cloudStorage/upload')
const BusBoy = require('busboy')

exports.createProfile = (req, res) => {
    const currentUser = req.currentUser;

    if (currentUser == null) {
        return res.status(403).json({ message: 'Sign in required' })
    }

    const userProfile = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        createdAt: new Date().toISOString(),
    };

    firestore.collection(profileCollection).doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(500)
                    .json({ message: "Profile is existed for this account" });
            } else {
                return;
            }
        })
        .then((_) => {
            firestore.collection(profileCollection).doc(currentUser.uid)
                .set(userProfile).then((response) => {
                    return res.status(200).json({ message: "success", ...userProfile });
                }).catch((err) => {
                    return res.status(500).json({ message: err });
                });
        })
        .catch((err) => {
            return res.status(500).json({ message: err });
        });
};

exports.fetchProfile = (req, res) => {
    const currentUser = req.currentUser;

    if (currentUser == null) {
        return res.status(403).json({ message: 'Sign in required' })
    }

    firestore.collection(profileCollection).doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(200).json(doc.data())
            } else {
                return res.status(404).json({ message: 'Profile not found' });
            }
        })
        .catch((err) => {
            return res.status(200).json({ message: err });
        });
};

exports.updateProfile = (req, res) => {
    const currentUser = req.currentUser

    if (currentUser == null) {
        return res.status(403).json({ message: 'Sign in required' })
    }

    const userProfile = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
    };
    firestore.collection(profileCollection).doc(currentUser.uid)
        .update(userProfile).then((response) => {
            return res.status(200).json({ message: "success", ...userProfile });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ message: err });
        });
};

exports.uploadAvatar = (req, res) => {
    var fields = {
        rootDir: 'avatars'
    }

    const currentUser = req.currentUser

    const uploadTask = new Promise((resolve, reject) => {
        const metadata = {
            contentType: 'image/jpeg',
        }
        uploadFile(req, fields, resolve, reject, metadata)
    })

    uploadTask
    .then(async avatarFileName => {
        try{

            const currentUser = req.currentUser

            if (currentUser == null) {
                return res.status(403).json({ message: 'Sign in required' })
            }

            const uid = currentUser.uid

            const doc = await firestore.collection(profileCollection).doc(currentUser.uid).get()

            if (doc.exists && doc.data().avatar != null) {
                storage.ref().child(`avatars/${doc.data().avatar}`)
                    .delete()
                    .catch(err => {
                        return res.status(500).json({ message: err })
                    })
            }

            const avatarDownloadUrl = await storage.ref().child(`avatars/${avatarFileName}`).getDownloadURL()

            await firestore.collection(profileCollection).doc(uid).update({
                avatar: avatarFileName,
                avatarUrl: avatarDownloadUrl})

            return res.status(200).json({ message: 'success', avatarUrl: avatarDownloadUrl })

        } catch(err){
            return res.status(500).json({ message: err })
        }
    }).catch(err => {
        console.error(err)
        return res.status(500).json({ message: err })
    })
}