const admin = require("firebase-admin");

const serviceAccount =
require("../secrets/naily-c16f5-firebase-adminsdk-opkpe-3ed2828e93.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();

const express = require("express");
const app = express();

const firebase = require("firebase");
const {firebaseConfig} = require("./config");

firebase.initializeApp(firebaseConfig);

module.exports = {admin, firestore, app, firebase};
