const User = require('../models/user')
const {upload} = require('../utils/S3')

const getUser = (req,res) => {
    const id = req.params.id;
    User.findById(id,(err,data) => {
      if(err)
      {
            res.status(500).send("Error With Database");
      }
      else
      {
          //console.log("DONE")
          res.json(data)
      }
  })
}



//update user
const updateUser = async (req,res) => {
    console.log("Smth")
    const id = req.params.id;
    userData = req.body
    console.log("Overhere!");
    console.log("Here: ",userData)
    let fileName = ""
    if(req.file)
    {
        fileName = req.file.filename
    }
    //file uploaded internally
    //upload image
    await upload(fileName,(err,data) => {
        if(err)
        {
            console.log("ERROR Uploading image");
        }
        else
        {
            userData = {
                ...userData,
                avatar:data.Location
            }            
        }
        //console.log("before update ",userData);
        User.findByIdAndUpdate(id,userData,{new:true},(err,data) => {
        if(err)
        {
            res.status(500).send("Error With Database");
        }
        else
        {
        //    console.log(data)
            res.json(data)
        }
      })

    }) 

}

module.exports = {updateUser,getUser}