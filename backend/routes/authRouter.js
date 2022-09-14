const express = require('express')
const {loginUser, isAuthentic,signUp, verifyUser, redirectUser,logoutUser,facebookLoginRedirect,loginWithGoogle, googleFailRedirect, googleSuccessRedirect, loginWithFacebook, facesuccess, facefail} = require('../controllers/authController')
const passport = require('passport')

const router = express.Router()


//authentication router
router.post('/login',loginUser,redirectUser)
router.post('/signup',signUp)
router.post('/logout',logoutUser)
router.get('/verify/:id/:token',verifyUser)
router.get('/authentic',isAuthentic)
router.get('/auth/google',loginWithGoogle)
router.get('/oauth2/redirect/google',googleFailRedirect, googleSuccessRedirect)
router.get('/auth/facebook',loginWithFacebook)
router.get('/auth/facebook/callback',facebookLoginRedirect)
router.get('/success',facesuccess)
router.get('/fail',facefail)

module.exports = router


