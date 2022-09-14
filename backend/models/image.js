const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    title: String,
    desc: String,
    img:String
})

const imageModel = mongoose.model('Image',imageSchema);

module.exports = imageModel;