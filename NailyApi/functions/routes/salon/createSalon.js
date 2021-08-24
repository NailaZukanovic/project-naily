const { firebase, firestore, storage} = require("../../utils/firebase");
const { salonCollection } = require("../../db/collections");
const path = require('path');
const BusBoy = require('busboy')
const uuid = require('uuid')
const fs = require('fs')

const createSalonTask = (req, resolve, reject) => {

    const busboy = new BusBoy({headers: req.headers})
    var fields = {
        featuredImages: []
    }
    var secretId = uuid.v4()
    var filePaths = [] 

    const tmpdir = 'tmp'
    const rootDir = 'salons/featuredImages/'

    fs.mkdir(tmpdir, {recursive: true}, err=>{
        if(err){
            reject(err)
        }
    })

    busboy.on('field', (field, value)=>{
        fields[field] = value
    })

    busboy.on('file',  (fieldname, stream, filename, encode, mimeType)=>{
        const secretFileName = `${secretId}+${filename}`
        const filepath = path.join(tmpdir, secretFileName)
        filePaths.push(filepath)
        stream.pipe(fs.createWriteStream(filepath))
        stream.resume()
    }) 

    busboy.on('finish', async () => {

        const newSalon = {
            name: fields.salonName,
            phoneNumber: fields.phoneNumber,
            address: fields.address,
            featureImageUrls: []
        }
        const metaData = {contentType: 'image/jpeg'}

        if(filePaths.length > 0){
            for(filepath of filePaths) {
                
                const splits = filepath.split('/') 
                const filename = splits[splits.length - 1]
                const refPath = path.join(rootDir, filename)
                const imageRef = storage.ref().child(refPath)

                try{
                    const data = fs.readFileSync(filepath)

                    await imageRef.put(data, metaData).then(snapShot=>{
                    }).catch(err=>reject(err))

                    await imageRef.getDownloadURL().then(url=>{
                        newSalon.featureImageUrls.push(url) 
                    }).catch(err=>reject(err))

                    fs.unlinkSync(filepath)
                } catch (err) {
                    reject(err)
                }
            }
        }

        await firestore.collection('salons').add(newSalon).then(doc=>{
            newSalon.id = doc.id
        }).catch(err=>reject(err))

        resolve(newSalon)
    })

    busboy.end(req.rawBody)

}

exports.newSalon = (req,res) => {

    const uploadTaskPromise = new Promise((resolve, reject)=>{
        createSalonTask(req, resolve, reject)
    })

    uploadTaskPromise.then(filePaths=>{
        console.log(filePaths)
        res.send('ok')
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
}
