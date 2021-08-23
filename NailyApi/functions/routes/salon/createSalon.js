const { firebase, firestore, storage} = require("../../utils/firebase");
const { salonCollection } = require("../../db/collections");
const path = require('path');
const BusBoy = require('busboy')
const uuid = require('uuid')
const fs = require('fs')

const uploadTask = (req, onField, onFile, onFinish) => {

    const busboy = new BusBoy({headers: req.headers})

    busboy.on('field', onField)

    busboy.on('file', onFile) 

    busboy.on('finish', onFinish)

    busboy.end(req.rawBody)

}

exports.newSalon = (req,res) => {

    var fields = {
        featuredImages: []
    }

    var secretId = uuid.v4()
    var filePaths = [] 

    const tmpdir = 'tmp'
    const rootDir = 'salons/featuredImages/'

    fs.mkdir(tmpdir, {recursive: true}, err=>{
        if(err){
            return res.status(500).json({message: err})
        }
    })

    const onField = (field, value) => {
        fields[field] = value
    }


    const onFile = (fieldname, stream, filename, encode, mimeType)=>{
        const secretFileName = `${secretId}+${filename}`
        const filepath = path.join(tmpdir, secretFileName)
        filePaths.push(filepath)
        stream.pipe(fs.createWriteStream(filepath))
        stream.resume()
    }

    const onFinish = () => {
        console.log('upload done')

        const newSalon = {
            name: fields.salonName,
            phoneNumber: fields.phoneNumber,
            address: fields.address,
        }
        var newSalonId = null
        const metaData = {contentType: 'image/jpeg'}
        firestore.collection('salons').add(newSalon).then(doc=>{
            newSalonId = doc.id

            if(filePaths.length > 0){
                filePaths.forEach(filepath=>{
                    
                    const splits = filepath.split('/') 
                    const filename = splits[splits.length - 1]
                    const refPath = path.join(rootDir, newSalonId, filename)
                    const imageRef = storage.ref().child(refPath)

                    fs.readFile(filepath, (err,data)=>{
                        if(err){
                            throw new Error(err)
                        } else {
                            imageRef.put(data, metaData).then(snapShot=>{
                                fs.unlink(filepath, err => {
                                    if(err){
                                        throw new Error(err)
                                    } else {
                                        console.log('upload image ', filepath)
                                    }
                                })
                            })
                        }
                    }) 
                })
            }
        }).catch(err=>{throw new Error(err)})
    }

    const uploadTaskPromise = new Promise((resolve, reject)=>{
        try{
            uploadTask(req, onField, onFile, onFinish)
            resolve(fields)
        } catch(err){
            reject(err)
        }
    })

    uploadTaskPromise.then(async fields=>{
        console.log(fields)
        console.log(filePaths)

        res.send('ok')
    }).catch(err=>{
        console.log(err)
    })
}
