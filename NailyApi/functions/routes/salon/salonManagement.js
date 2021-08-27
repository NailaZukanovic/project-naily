const { firebase, firestore, storage } = require("../../utils/firebase");
const { salonCollection , salonFeaturedImages} = require("../../db/collections");
const path = require('path');
const BusBoy = require('busboy')
const uuid = require('uuid')
const fs = require('fs')

const uploadSalonImage = (req, resolve, reject) => {

    const busboy = new BusBoy({ headers: req.headers })

    var secretId = uuid.v4()
    var filepath = null
    var uploadedFilename = null
    var salonId = null
    var rootDir = null

    const tmpdir = 'tmp'

    fs.mkdir(tmpdir, { recursive: true }, err => {
        if (err) {
            reject(err)
        }
    })

    busboy.on('field', (key, value) => {
        if (key == 'salonId') {
            salonId = value
        }
    })

    busboy.on('file', (fieldname, stream, filename, encode, mimeType) => {
        uploadedFilename = filename
        const secretFileName = `${secretId}+${filename}`
        filepath = path.join(tmpdir, secretFileName)
        stream.pipe(fs.createWriteStream(filepath))
        stream.resume()
    })

    busboy.on('finish', async () => {
        if (salonId == null || salonId === '') {
            return reject('Salon id is not provided in request body')
        } else {
            try {
                //Check if salon id exists
                const doc = await firestore.collection(salonCollection).doc(salonId).get()

                if (doc.exists) {
                    if (doc.data().featuredImages.length >= 5) {
                        return reject('Each salon only is allowed maximum 5 feature images')
                    }
                } else {
                    return reject('Salon not found')
                }

                rootDir = `${salonCollection}/${salonFeaturedImages}/${salonId}`

                const metaData = { contentType: 'image/jpeg' }
                const refPath = path.join(rootDir, uploadedFilename)
                const imageRef = storage.ref().child(refPath)
                const data = fs.readFileSync(filepath)

                await imageRef.put(data, metaData)

                var imageDownloadUrl = await imageRef.getDownloadURL()

                await firestore.collection(salonCollection).doc(salonId).update({
                    featuredImages: firebase.firestore.FieldValue.arrayUnion(imageDownloadUrl)
                })

            } catch (err) {
                return reject(err)
            }

            return resolve(imageDownloadUrl)
        }
    })

    busboy.end(req.rawBody)

}

exports.newSalon = (req, res) => {
    console.log(req.body)
    const currentUser = req.currentUser;

    const uid = currentUser.uid

    const newSalon = {
        salonName: req.body.salonName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        featuredImages: [],
        ownerId: uid,
        openHours: req.body.openHours
    }

    firestore.collection(salonCollection).add(newSalon).then(doc => {
        newSalon.id = doc.id
        return res.status(200).json({ message: 'sucesss', salon: newSalon })
    }).catch(err => {
        return res.status(500).json({ message: err })
    })
}

exports.uploadSalonImage = async (req, res) => {

    var uploadTaskPromise = new Promise((resolve, reject) => {
        uploadSalonImage(req, resolve, reject)
    })
    try{
        const url = await uploadTaskPromise
        res.status(200).json({ message: 'ok', imageURL: url })
    } catch(err){
        console.log(err)
        res.status(500).json({ message: err})
    }

    // Clean up tmp directory
    fs.readdir('tmp', (err, files)=>{
        for(var file of files){
            fs.unlink(path.join('tmp', file), (err)=>{
                if(err){
                    console.error(err)
                }
            })
        }
    })
}

exports.fetchMySalons = (req,res)=>{
    const uid = req.currentUser.uid
    var data = []
    firestore.collection(salonCollection).where('ownerId', '==', uid)
    .get()
    .then(snapShot=>{
        if(snapShot.empty == false){
            snapShot.forEach(doc=>{
                var {ownerId, ...salon} = doc.data()
                data.push({...salon, id: doc.id})
            })
        }
        return res.status(200).json(data)
    })
    .catch(err=>{
        return res.status(500).json({message: err})
    })
}

