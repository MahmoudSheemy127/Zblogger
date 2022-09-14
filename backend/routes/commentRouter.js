const express = require("express")

const { getComments, postComment, getComment } = require("../controllers/commentController")


const router = express.Router()

router.get('/',getComments);
router.post('/',postComment);
router.get('/:id',getComment);

module.exports = router