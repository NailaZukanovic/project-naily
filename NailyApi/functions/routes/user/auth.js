const {firebase} = require("../../utils/firebase");

exports.healthCheck = (req, res)=>{
  res.status(200).json("HEALTHY AS FUCK");
};

exports.signup = (req, res)=>{
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(newUser);

  firebase.auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data)=>{
        console.log(data);
        res.status(200).json(`user-id: ${data.user.uid}`);
      }).catch((error) => {
        res.status(500).json(`SERVER ERRRO: ${error.mesasge}`);
      });
};

exports.signin = (req, res)=>{
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data)=>{
        return data.user.getIdToken();
      })
      .then((token)=>{
        return res.status(200).json({token: token});
      })
      .catch((error)=>{
        res.status(501).json(`${error}`);
      });
};
