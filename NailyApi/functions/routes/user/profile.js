const {firestore, firebase} = require("../../utils/firebase");
const {profileCollection} = require("../../db/collections");

exports.createProfile = (req, res)=>{
  const currentUser = firebase.auth().currentUser;

  const userProfile = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    createdAt: new Date().toISOString(),
  };
  firestore.collection(profileCollection).doc(currentUser.uid).get()
      .then((doc)=>{
        if (doc.exists) {
          return res.status(404)
              .json({message: "Profile is existed for this account"});
        } else {
          return;
        }
      })
      .then((_)=>{
        console.log("Setting up profile");
        firestore.collection(profileCollection).doc(currentUser.uid)
            .set(userProfile).then((response)=>{
              console.log(response);
              return res.status(200).json({message: "SUCCESS"});
            }).catch((err)=>{
              console.log(err);
              return res.status(500).json({message: err});
            });
      })
      .catch((err)=>{
        return res.status(500).json({message: "Username is taken"});
      });
};

exports.fetchProfile = (req, res)=>{
  const currentUser = firebase.auth().currentUser;

  firestore.collection(profileCollection).doc(currentUser.uid).get()
      .then((doc)=>{
        console.log(doc.data());
        return res.status(200).json(doc.data());
      })
      .catch((err)=>{
        return res.status(200).json({message: err});
      });
};

exports.updateProfile = (req, res)=>{
  const userProfile = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
  };
  firestore.collection(profileCollection).doc(userProfile.username)
      .update(userProfile).then((response)=>{
        console.log(response);
        return res.status(200).json({message: "SUCCESS"});
      }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: err});
      });
};


