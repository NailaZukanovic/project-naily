const {admin, db} = require('../../utils/firebase')

exports.healthCheck = (req,res)=>{
    res.status(200).json("HEALTHY AS FUCK")
}

exports.signup = (req,res)=>{
    const newUser = {
        email: req.body.email,
        password: req.body.email
    }

    db.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data=>{

    }).catch(error => {
        res.status(500).json(`SERVER ERRRO: ${error.mesasge}`)
    })

}
