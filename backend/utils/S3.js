const s3 = require('../config/s3')
const fs = require('fs');
const path = require('path')
require('dotenv').config()



const upload = async (filename,cb) => {
    try{
        const file = fs.readFileSync(path.join(process.cwd(),'uploads',filename));
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Body: file,
            Key: filename
        }
    
                                                                      
        await s3.upload(params,(err,data) => {
            if(err)
            {
                cb(err)
            }
            else
            {
                cb(null,data)
            }
        })

    }
    catch(err)
    {
        cb(err)
    }


    //TODO remove file

}


module.exports = {upload}