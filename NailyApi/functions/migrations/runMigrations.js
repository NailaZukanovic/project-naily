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

module.exports = () => {
  // Create dummy account
  console.log(dummyAccounts);
  let i = 0;
  dummyAccounts.forEach((account) => {
    firebase.auth()
        .createUserWithEmailAndPassword(account.email, account.password)
        .then((response) => {
          console.log(`Created new user with uid = ${response.user.uid}`);
          createProfile(response.user.uid, dummyProfiles[i]);
        }).catch((err) => {
          console.log(err.message);
        });
    i+=1;
  });
};
