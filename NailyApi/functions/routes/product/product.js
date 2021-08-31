const { firebase, firestore, storage } = require("../../utils/firebase");
const { salonCollection , salonProducSubCollection} = require("../../db/collections");

exports.addNewProduct = (req, res) => {

    const product = {
        name: req.body.name,
        like: 0,
        duration: req.body.duration,
        reviews: 0,
        imageURLS: []
    }

    firestore.collection(salonCollection).collection(salonProducSubCollection)
    .add(product)
    .then(doc=>{
       return res.status(200).json({message: 'success', id: doc.id}) 
    })
    .catch(err=>{
       return res.status(500).json({message: err}) 
    })
}
