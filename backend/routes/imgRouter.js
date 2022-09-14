const express = require('express');
const {postImg, getImg} = require('../controllers/imgController')
const upload = require('../utils/Multer')
const router = express.Router();

router.post('/',upload.single('image'),postImg)
router.get('/',getImg)


module.exports = router
