require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI,(err,done) => {
    if(err)
    {
        console.log("Mongodb couldn't connect");
    }
    else
    {
        console.log("Mongodb connected");
        
    }
})

