const {admin, firebase} = require("../utils/firebase");

exports.isSignedIn = (req, res, next)=>{
  const currentUser = firebase.auth().currentUser;
  if (currentUser==null) {
    return res.status(403)
        .json({message: "Unauthorized. Please sign in first"});
  } else {
    return next();
  }
};

exports.tokenAuth = (req, res, next) => {
  let idToken;

  if (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json("Unauthorized");
  }

  admin.auth().verifyIdToken(idToken)
      .then((decodedToken)=>{
        console.log("decoded token", decodedToken);
        return next();
      }).catch((error)=>{
        return res.status(403).json(error);
      });
};
