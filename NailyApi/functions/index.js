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
  uploadAvatar,
  fetchAvatar
} = require("./routes/user/profile");
const {
  fetchSalons,
  fetchSalonById,
} = require('./routes/salon/explore')

const {isSignedIn} = require("./middlewares/firebaseAuth");
const runMigration = require("./migrations/runMigrations");

console.log('API is starting ... ')

// Run data migrations. RUN IT ONCE WHEN THE COLLECTIONS ARE TEMPTy
runMigration();

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

//Salons
app.get('/fetchSalons', isSignedIn, fetchSalons)
app.get('/fetchSalonById/:id', isSignedIn, fetchSalonById)

//upload files
app.post('/uploadAvatar', isSignedIn, uploadAvatar)  

exports.api = functions.https.onRequest(app);
