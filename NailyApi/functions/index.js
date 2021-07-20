const functions = require("firebase-functions");
const {app} = require('./utils/firebase')
const {healthCheck} = require('./routes/user/auth')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


app.get('/healthCheck', healthCheck)

exports.api = functions.https.onRequest(app)