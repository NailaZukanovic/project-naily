const BusBoy = require('busboy')
const {storage} = require('../../utils/firebase')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

exports.uploadImage = (req,res) => {
    const busboy = new BusBoy({headers: req.headers})
    const tempDir = 'tmp'
    var file = null;

    fs.mkdir(tempDir, {recursive: true}, err=>{
        if(err){
            return res.send(err)
        }
    })
    
    busboy.on('field', (key, value)=>{
        console.log(key,'  ',value)
    })
    var filepath;

    busboy.on('file', (fieldname, stream, filename, encoding, mimetype)=>{
        // const id = uuid.v4()
        filepath = path.join(tempDir, filename)
        console.log(`handling ${filename} : ${filepath}`)
        stream.pipe(fs.createWriteStream(filepath))
    })

    busboy.on('finish', ()=>{
        console.log('on finish')
        const avatarDir = 'avatars'
        const id = uuid.v4()

        const imageRef = storage.ref().child([avatarDir, id].join('/'))

        fs.readFile(filepath, async (err,data)=>{
            if(err){
                return res.send(err)
            } else {
                try{
                await imageRef.put(data).then(snapShot => {
                    return res.send('uploaded')
                }).catch(err=>{
                    return res.send(err)
                })

                fs.unlink(filepath)

                } catch(err){
                    console.log('error : ', err)
                    return res.send(err)
                }
            }
        })
    })

    busboy.end(req.rawBody)
}