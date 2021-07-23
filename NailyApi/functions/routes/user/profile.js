const {firestore, firebase} = require("../../utils/firebase");

exports.createProfile = (req, res)=>{
  const userProfile = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
  };
  firestore.collection("users").doc(userProfile.username).get()
      .then((doc)=>{
        if (doc.exists) {
          return res.status(404).json({message: "Username is taken"});
        } else {
          return;
        }
      })
      .then((_)=>{
        console.log("Setting up profile");
        firestore.collection("users").doc(userProfile.username)
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

exports.updateProfile = (req, res)=>{
  const userProfile = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
  };
  firestore.collection("users").doc(userProfile.username)
      .update(userProfile).then((response)=>{
        console.log(response);
        return res.status(200).json({message: "SUCCESS"});
      }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: err});
      });
};


