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
  uploadSalonImage,
  newSalon,
  fetchMySalons

} = require('./routes/salon/salonManagement')

const {
  addNewProduct
} = require('./routes/product/product')

const {isSignedIn, verifyToken} = require("./middlewares/firebaseAuth");
const runMigration = require("./migrations/runMigrations");

console.log('Starting API ...')


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
app.post('/createSalon',isSignedIn ,newSalon)
app.post('/uploadSalonImage', isSignedIn, uploadSalonImage)
app.get('/fetchMySalons', isSignedIn, fetchMySalons)

//Products
app.get('/createProduct', isSignedIn, addNewProduct)


exports.api = functions.https.onRequest(app);
