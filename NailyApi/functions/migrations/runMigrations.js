const { firestore, firebase } = require("../utils/firebase");
const { profileCollection, salonCollection } = require("../db/collections");
const dummyAccounts = require("../migrations/dummyAccounts");
const dummyProfiles = require("../migrations/dummyProfiles");
const {firebaseConfig} = require('../utils/config')
const axios = require('axios');
const dummySalons = require("./dummySalons");
const { extractInstanceAndPath } = require("firebase-functions/lib/providers/database");

//#############################################
// DANGER: DO NOT RUN THIS SCRIPT ON PRODUCTION
//#############################################

const clearDb = async () => {
  axios.delete(`http://localhost:9099/emulator/v1/projects/${firebaseConfig.projectId}/accounts`).then(()=>{}).catch(err=>{console.log(err)})
  axios.delete(`http://localhost:8080/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`).then(()=>{}).catch(err=>{console.log(err)})
}

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

const createSalon = (salon) => {
  firestore.collection(salonCollection).add({
    name: salon.name,
    address: salon.address,
    phonenumber: salon.phonenumber,
    imageUrls: salon.imageUrls,
    followingUserIds: salon.followingUserIds,
    workerSnapShots: salon.workerSnapShots
  }).then(doc=>{

    for(review of salon.reviews){
      firestore.doc(`${salonCollection}/${doc.id}`)
      .collection('reviews')
      .add(review)
      .catch(err=>console.log(err))
    }

    for(product of salon.products){
      const {reviews, ...productInfo} = product
      firestore.doc(`${salonCollection}/${doc.id}`)
      .collection('products')
      .add(productInfo)
      .then(productDoc=>{
        for(review of reviews){
          firestore.doc(`${salonCollection}/${doc.id}/products/${productDoc.id}`)
          .collection('reviews')
          .add(review)
          .catch(err=>console.log(err))
        }
      })
      .catch(err=>console.log(err))
    }
  })
  .catch(err=>console.log(err))
}

module.exports = async () => {


  console.info("#######################")
  console.info("RUNNING DATA MIGRATION")
  console.info("#######################")

  await clearDb()
  var uids = []
  for(account of dummyAccounts){
    await firebase.auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then((response) => {
        console.log(`Created new user with uid = ${response.user.uid}`);
        return response.user.uid
      })
      .then(uid => {
        uids.push(uid)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //Create profiles for each new account
  var i = 0;
  for(uid of uids){
    createProfile(uid, dummyProfiles[i])
    i=i+1
  }

  //Create dummy salons data
  console.log(JSON.stringify(dummySalons, null, '\t'))
  for(salon of dummySalons){
    createSalon(salon)
  }


};
