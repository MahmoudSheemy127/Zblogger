const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    dateOfBirth:Date,
    age: Number,
    userBio:String,
    avatar:String,
    userName:String,
    facebook:String,
    twitter:String,
    instagram:String,
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    blogList:{
        type:Array,
        default:[]
    },
    verified:{
        type:Boolean,
        default:false
    }
})


const User = mongoose.model('user',userSchema);

module.exports = User