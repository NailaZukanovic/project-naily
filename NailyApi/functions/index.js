const functions = require("firebase-functions");
const {app} = require("./utils/firebase");
const {
  healthCheck,
  signUp,
  signIn,
  updatePassword,
  signOut,
} = require("./routes/user/auth");
const {
  createProfile,
  updateProfile,
  fetchProfile,
} = require("./routes/user/profile");
const {isSignedIn} = require("./middlewares/firebaseAuth");

const runMigration = require("./migrations/runMigrations");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Run data migrations. RUN IT ONCE WHEN THE COLLECTIONS ARE TEMPTy
// runMigration();

app.get("/healthCheck", healthCheck);
// User authentication
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/signOut", signOut);
app.post("/updatePassword", updatePassword);

// Profile
app.post("/createProfile", isSignedIn, createProfile);
app.get("/fetchProfile", isSignedIn, fetchProfile);
app.post("/updateProfile", isSignedIn, updateProfile);

exports.api = functions.https.onRequest(app);
