const functions = require("firebase-functions");
const {app} = require("./utils/firebase");
const bodyParser = require('body-parser')
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
} = require("./routes/user/profile");
const {
  fetchSalons,
  fetchSalonById,
} = require('./routes/salon/explore')

const {
  uploadSalonImages,
  newSalon 
} = require('./routes/salon/createSalon')

const {isSignedIn} = require("./middlewares/firebaseAuth");
const runMigration = require("./migrations/runMigrations");
runMigration()

app.get("/healthCheck", healthCheck);
app.get("/seedData", (req,res)=>{
  runMigration()
  res.send('okay')
});

// User authentication
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/signOut", signOut);
app.post("/updatePassword", updatePassword);

// Profile
app.post("/createProfile", isSignedIn, createProfile);
app.get("/fetchProfile", isSignedIn, fetchProfile);
app.post("/updateProfile", isSignedIn, updateProfile);
app.post('/uploadAvatar', isSignedIn, uploadAvatar)  

//Salons
app.get('/fetchSalons', isSignedIn, fetchSalons)
app.get('/fetchSalonById/:id', isSignedIn, fetchSalonById)
app.post('/createSalon', newSalon)

exports.api = functions.https.onRequest(app);
