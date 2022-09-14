const express = require('express')
const {uploadBlogs,getBlogs,updateBlog, getBlog,} = require('../controllers/blogController')
const upload = require('../utils/Multer')
const router = express.Router()


router.post('/',upload.single('cover'),uploadBlogs)
router.get('/',getBlogs)
router.put('/:id',updateBlog);
router.get('/:id',getBlog)
module.exports = router
