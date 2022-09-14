const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title:String,
    cover:String,
    subtitle:String,
    userId:String,
    userName:String,
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default: Date.now
    },
    body:String
})


const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog

