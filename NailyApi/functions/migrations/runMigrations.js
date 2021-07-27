const {firestore, firebase} = require("../utils/firebase");
const {profileCollection} = require("../db/collections");
const dummyAccounts = require("../migrations/dummyAccounts");
const dummyProfiles = require("../migrations/dummyProfiles");


const createProfile = (uid, profile) => {
  firestore.collection(profileCollection)
      .doc(uid)
      .set(profile)
      .then((data) => {
        console.log(`Created profile for ${uid}`);
      })
      .catch((err) => {
        console.log(`ERROR ${err}`);
      });
};

module.exports = async () => {
  // Create dummy account
  console.log(dummyAccounts);
  for(var i = 0;i<dummyAccounts.length;i++){
    var account = dummyAccounts[i]
    var profile = dummyProfiles[i]
    await firebase.auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then((response) => {
          console.log(`Created new user with uid = ${response.user.uid}`);
          return response.user.uid
        })
        .then(uid=>{
          createProfile(uid, profile);

        })
        .catch((err) => {
          console.log(err.message);
        });
  }
};
