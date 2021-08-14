const { firestore, storage} = require("../../utils/firebase");
const { profileCollection } = require("../../db/collections");
const { uploadFile } = require('../../utils/cloudStorage/upload')
const BusBoy = require('busboy')

exports.createProfile = (req, res) => {
    const currentUser = req.currentUser;

    if(currentUser == null){
        return res.status(500).json({message: 'Sign in required'})
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

    if(currentUser == null){
        return res.status(500).json({message: 'Sign in required'})
    }

    firestore.collection(profileCollection).doc(currentUser.uid).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(200).json(doc.data());
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

    if(currentUser == null){
        return res.status(500).json({message: 'Sign in required'})
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

exports.uploadAvatar = async (req, res) => {
    var fields = {
        rootDir: 'avatars'
    }
    
    const currentUser = req.currentUser

    await firestore.collection(profileCollection).doc(currentUser.uid).get()
    .then(doc=>{
        if(doc.exists){
            if(doc.data().avatar != null){
                const imageRef = storage.ref().child(`avatars/${doc.data().avatar}`)
                .delete().then(()=>{
                }).catch(err=>{
                    return res.status(500).json({message: err})
                })
            }
        } 
    }).catch(err=>{
        return res.status(500).json({message: err})
    })

    const uploadTask = new Promise((resolve, reject) => {
        uploadFile(req, fields, resolve, reject)
    })

    uploadTask.then(avatarFileName => {
        const currentUser = req.currentUser

        if(currentUser == null){
            return res.status(500).json({message: 'Sign in required'})
        }

        const uid = currentUser.uid

        firestore.collection(profileCollection).doc(uid).update({
            avatar: avatarFileName
        }).then(response=>{
            return res.status(200).json({ message: 'success', url: avatarFileName})
        }).catch(err=>{
            return res.status(500).json({ message: err })
        })
    }).catch(err => {
        console.error(err) 
        return res.status(500).json({ message: err })
    })
}
