
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const express = require('express')
const app = express()

const firebase = require('firebase')
const {firebaseConfig} = require('./config')


firebase.initializeApp(firebaseConfig)

module.exports = {admin, db, app, firebase}