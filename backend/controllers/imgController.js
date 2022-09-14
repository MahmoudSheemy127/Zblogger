const Image = require('../models/image');
require('dotenv').config()
const S3 = require('../config/s3')

const fs = require('fs');
const path = require('path');
var pathConst = __dirname
pathConst = pathConst.replace("\controllers","");


// const uploadImgToBucket = () => {

// }


const postImg = (req,res,next) => {
    console.log(req.file);
    console.log(pathConst)

    //read file data from uploads folder thanks to multer package 
    const fileContent = fs.readFileSync(path.join(pathConst  ,'uploads' , req.file.filename)) 
    
    //params option for s3 uploading image
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Body: fileContent,
        Key: req.file.filename
    }

    S3.upload(params,(err,data) => {
        if(err)
        {
            console.log("Error uploading image to bucket")
        }
        else
        {
            const obj = {
                title: req.body.title,
                desc: req.body.desc,
                img: data.Location
            }
            Image.create(obj,(err,data) => {
                if(err)
                {
                    res.status(500).send("Error uploading doc")
                }
                else
                {
                    res.json(data)
                }
            })            
        }
    })

    //remove files from upload directory 
    fs.readdir(path.join(pathConst,'uploads'),(err,files) => {
            if(err)
            {
                console.log("Error removing files");
            }
            else
            {
                files.forEach((file) => {
                    fs.unlink(path.join(pathConst,'uploads',file), err => {
                        console.log(err)
                    })
                })
            }

    })
}

const getImg = (req,res) => {

    //res.sendFile(__dirname + '/views/imageView');
    Image.find({},(err,data) => {
        if(err)
        {
            res.status(500).send("Error receiveing images");
        }
        else
        {
            console.log("In here ",data)
            res.render('imageView',{data: data});
        }
    })

    
}


module.exports = {postImg, getImg}