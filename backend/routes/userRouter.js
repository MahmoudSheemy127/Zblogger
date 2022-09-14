const {updateUser, getUser} = require('../controllers/userController')
const {followUser, unfollowUser} = require('../controllers/followerController')
const express = require("express")
const upload = require("../utils/Multer");

const router = express.Router()

router.put('/:id',upload.single('avatar'),updateUser);
router.get('/:id',getUser);
router.post('/follow/:id',followUser)
router.post('/unfollow/:id',unfollowUser)
module.exports = router