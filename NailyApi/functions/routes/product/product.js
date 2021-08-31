const { firebase, firestore, storage } = require("../../utils/firebase");
const { salonCollection , salonProducSubCollection} = require("../../db/collections");
const path = require('path');
const BusBoy = require('busboy')
const uuid = require('uuid')
const fs = require('fs')

const uploadProductImage = (req, toCleanUpFiles, resolve, reject) => {
    const busboy = new BusBoy({headers: req.headers})

    var secretId = uuid.v4()
    var filepath = null
    var uploadedFilename = null

    var productId = null
    var salonId = null

    var rootDir = null

    const tmpdir = 'tmp'

    var secretFileName

    fs.mkdir(tmpdir, { recursive: true }, err => {
        if (err) {
            reject(err)
        }
    })

    busboy.on('field', (key, value) => {
        if (key == 'productId') {
            productId = value
        } else if(key == 'salonId'){
            salonId = value
        }
    })

    busboy.on('file', (fieldname, stream, filename, encode, mimeType) => {
        uploadedFilename = filename
        secretFileName = `${secretId}+${filename}`
        filepath = path.join(tmpdir, secretFileName)
        stream.pipe(fs.createWriteStream(filepath))
        toCleanUpFiles.push(filepath)
        stream.resume()
    })

    busboy.on('finish', async () => {
        if (productId == null || productId === '' || salonId == null || salonId === '') {
            return reject('Product ID of salon ID is not provided in request body')
        } else {
            try {
                //Check if product id exists
                const doc = await firestore.collection(salonCollection).doc(salonId).collection(salonProducSubCollection).doc(productId).get()

                if (doc.exists) {
                    if (doc.data().imageURLs.length >= 5) {
                        return reject('Each product is only allowed maximum 5 images')
                    }
                } else {
                    return reject('Product not found')
                }

                rootDir = `${salonCollection}/${salonProducSubCollection}/${productId}/`

                const metaData = { contentType: 'image/jpeg' }
                const refPath = path.join(rootDir, secretFileName)
                const imageRef = storage.ref().child(refPath)
                const data = fs.readFileSync(filepath)

                await imageRef.put(data, metaData)

                var imageDownloadUrl = await imageRef.getDownloadURL()

                await firestore.collection(salonCollection).doc(salonId).collection(salonProducSubCollection).doc(productId).update({
                    imageURLs: firebase.firestore.FieldValue.arrayUnion(imageDownloadUrl)
                })

            } catch (err) {
                return reject(err)
            }

            return resolve(imageDownloadUrl)
        }
    })

    busboy.end(req.rawBody)
}

exports.addNewProduct = (req, res) => {

    const salonId = req.body.salonId

    const product = {
        name: req.body.name,
        like: 0,
        duration: req.body.duration,
        reviews: 0,
        imageURLs: []
    }

    firestore.collection(salonCollection).doc(salonId).collection(salonProducSubCollection)
    .add(product)
    .then(doc=>{
       return res.status(200).json({message: 'success', id: doc.id}) 
    })
    .catch(err=>{
       return res.status(500).json({message: err}) 
    })
}

exports.uploadProductImage = async (req, res) => {

    var toCleanUpFiles = []

    const uploadTaskPromise = new Promise((resolve, reject) => {
        uploadProductImage(req, toCleanUpFiles, resolve,reject)
    })

    try{
        const url = await uploadTaskPromise
        res.status(200).json({ message: 'ok', imageURL: url })
    } catch(err){
        console.log(err)
        res.status(500).json({ message: err})
    }

    // Clean up tmp directory
    for(var file of toCleanUpFiles){
        fs.unlink(path.join(file), (err)=>{
            if(err){
                console.error(err)
            }
        })
    }
}
