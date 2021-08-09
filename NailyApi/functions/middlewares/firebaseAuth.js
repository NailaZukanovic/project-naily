const {admin, firebase} = require("../utils/firebase");

exports.isSignedIn = (req, res, next)=>{
  const currentUser = firebase.auth().currentUser;
  if (currentUser==null) {
    return res.status(403)
        .json({message: "Unauthorized. Please sign in first"});
  } else {
    req.currentUser = firebase.auth().currentUser
    console.log('current user ', req.currentUser.uid)
    return next();
  }
};
