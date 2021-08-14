const BusBoy = require('busboy')
const {storage} = require('../../utils/firebase')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const defualtOnField = (key, value) => {}

exports.uploadFile = (req, fields, resolve, reject, onField = defualtOnField) => {
    try{
        const tmpdir = 'tmp'

        fs.mkdir(tmpdir, {recursive: true}, err=>{
            if(err){
                reject(err)
            }
        })

        const busboy = new BusBoy({headers: req.headers})
        var secretId = uuid.v4()
        var secreteFileName = null
        var filepath = null

        busboy.on('field', onField)

        busboy.on('file', (fieldname, stream, filename, encoding, mimetype)=>{
            secreteFileName = `${secretId}+${filename}`
            filepath = path.join(tmpdir, secreteFileName)
            stream.pipe(fs.createWriteStream(filepath))
            stream.resume()
        })

        busboy.on('finish', ()=>{

            const refpath = path.join(fields.rootDir,secreteFileName)
            const imageRef = storage.ref().child(refpath)

            fs.readFile(filepath, (err,data)=>{
                if(err){
                    reject(err)
                } else {
                    imageRef.put(data).then(snapShot => {
                        fs.unlink(filepath, err=>{
                            if(err){
                                reject(err)
                            }
                        })
                        resolve(secreteFileName)
                    }).catch(err=>{
                        reject(err)
                    })
                }
            })
        })

        busboy.end(req.rawBody)
    } catch (err) {
        reject(err)
    }
}

