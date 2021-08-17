const admin = require("firebase-admin");

const serviceAccount =
require("../secrets/naily-c16f5-firebase-adminsdk-opkpe-3ed2828e93.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const app = express();

const firebase = require("firebase");
const {firebaseConfig, localhost} = require("./config");
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore();

const storage = firebase.storage();


//Use emulators
firebase.auth().useEmulator(`http://${localhost}:9099`)
firestore.useEmulator(localhost,8080)
storage.useEmulator(localhost,9199)


module.exports = {admin, firestore, app, firebase, storage};
