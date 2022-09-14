const express = require("express")
const {followUser} = require("../controllers/followerController")

const router = express.Router()

router.post('/:id',followUser)
router.post('/:id',followUser)

module.exports = router