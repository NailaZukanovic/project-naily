const { firebase, firestore} = require("../../utils/firebase");
const { salonCollection } = require("../../db/collections");
const {uploadFile} = require('../../utils/cloudStorage/upload')
const path = require('path')

exports.uploadSalonImages = (req,res) => {
    const salonRoot = 'salons'
    const featuredImage = 'featuredImg'

    var fields = {
        rootDir: null
    }

    const onField = (key, value) => {
        if(key === 'salonId'){
            fields.rootDir = path.join(salonRoot, value, featuredImage)
            fields.salonId = value
        }
    }

    const uploadPromise = new Promise((resolve, reject)=>{
        const metadata = {
            contentType: 'image/jpeg',
        }
        
        uploadFile(req, fields, resolve, reject, metadata,  onField)
    }) 

    uploadPromise
    .then(downloadUrl => {
        console.log(downloadUrl)
        firestore.collection(salonCollection).doc(fields.salonId).update({
            imageUrls: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
        }).then(response=>{
            return res.status(200).json({ message: 'success', url: downloadUrl})
        }).catch(err=>{
            switch(err.code){
                case 'not-found':
                    return res.status(404).json({ message: 'Document id not found' })
                default:
                    return res.status(500).json({ message: 'Unknown error' })
            }
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: err })
    })
}