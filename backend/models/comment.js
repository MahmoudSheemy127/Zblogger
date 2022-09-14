const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:String,
    user_id:String,
    date:{
        type:Date,
        default:Date.now
    },
    replies:{
        type:Array,
        default:[]
    }
})


const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment