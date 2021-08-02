const {firestore} = require("../../utils/firebase");
const {salonCollection} = require("../../db/collections");

exports.fetchSalons = (req,res)=>{
    firestore.collection(salonCollection).get()
    .then(snapShot=>{
        docs = []
        snapShot.forEach(doc=>{
            docs.push({id: doc.id, data: doc.data()})
        })
        res.status(200).json({count: docs.length, data: docs})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message: err})
    })
}

exports.fetchSalonById = async (req,res)=>{
    var id = req.params.id
    var docRef = firestore.collection(salonCollection).doc(id)
    var products = []
    var reviews = []

    await docRef.collection('products').get()
    .then(snapShot=>{
        snapShot.forEach(productDoc=>{
            products.push(productDoc.data())
        })
    })
    .catch(err=>{
        res.status(500).json({message: err})
    })

    await docRef.collection('reviews').get()
    .then(snapShot=>{
        snapShot.forEach(reviewDoc=>{
            reviews.push(reviewDoc.data())
        })
    })
    .catch(err=>{
        res.status(500).json({message: err})
    })

    await docRef.get()
    .then(doc=>{
        console.log(doc.data())
        if(doc.data()==null){
            res.status(404).json({messgae: "Document is not found"})
        } else {
            res.status(200).json({
                ...doc.data(), 
                products: products, 
                reviews: reviews})
        }
    })
    .catch(err=>{
        res.status(500).json({message: err})
    })
}
