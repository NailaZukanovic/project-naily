const { firestore } = require("../../utils/firebase");
const { profileCollection } = require("../../db/collections");
const { uploadFile } = require('../../utils/cloudStorage/upload')

exports.createProfile = (req, res) => {
    const currentUser = req.currentUser;

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
            return res.status(500).json({ message: "Username is taken" });
        });
};

exports.fetchProfile = (req, res) => {
    const currentUser = req.currentUser;

    firestore.collection(profileCollection).doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(200).json(doc.data());
            } else {
                return res.status(404).json({ message: 'Document not found' });
            }
        })
        .catch((err) => {
            return res.status(200).json({ message: err });
        });
};

exports.updateProfile = (req, res) => {
    const currentUser = req.currentUser

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
    const uploadTask = new Promise((resolve, reject) => {
        uploadFile(req, 'avatars', resolve, reject)
    })
    uploadTask.then(downloadUrl => {

        const uid = req.currentUser.uid

        firestore.collection(profileCollection).doc(uid).update({
            avatarUrl: downloadUrl
        }).then(response=>{
            return res.status(200).json({ message: 'success', url: downloadUrl})
        }).catch(err=>{
            return res.status(500).json({ message: err })
        })
    }).catch(err => {
        return res.status(500).json({ message: err })
    })
}
