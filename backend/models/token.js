const mongoose = require('mongoose')


//Email verification token schema
const tokenSchema = new mongoose.Schema({
    userId:String,
    token:String
})

const Token = mongoose.model('token',tokenSchema)


module.exports = Token