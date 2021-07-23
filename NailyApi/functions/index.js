const functions = require("firebase-functions");
const {app} = require("./utils/firebase");
const {healthCheck, signup, signin} = require("./routes/user/auth");
const {tokenAuth} = require("./middlewares/firebaseAuth");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


app.get("/healthCheck", healthCheck);
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/test", tokenAuth, (req, res)=>{
  return res.status(200).json({message: "SUCCESS"});
});
exports.api = functions.https.onRequest(app);
