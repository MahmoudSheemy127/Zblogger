const User = require('../models/user')
const sendEmail = require('../utils/Email')
const bcrypt = require('bcrypt')
const Token = require('../models/token')
const crypto = require('crypto')
const passport = require('passport')

//loginUser method
const loginUser = passport.authenticate('local');


//redirectUser method (redirects user upon complete login)
const redirectUser = (req,res) => {
        res.send(req.user)        
}

//login with google handler
const loginWithGoogle = passport.authenticate('google');

//failure redirect upon login with google 
const googleFailRedirect = passport.authenticate('google',{failureRedirect: process.env.APP_URI+'/login'})

//login with facebook handler
const loginWithFacebook = passport.authenticate('facebook', {scope: ['email', 'public_profile']})

//failure redirect upon login with facebook
const facebookLoginRedirect = passport.authenticate('facebook',{failureRedirect: '/fail', successRedirect: '/success'})

const facefail = (req,res) => {
    res.redirect(process.env.APP_URI+"/login")
}

const facesuccess = (req,res) => {
    res.redirect(process.env.APP_URI)
}

const facebookSuccessRedirect = (req,res) => {
    console.log("Yeaah");
    res.redirect(process.env.APP_URI)
}


//success redirect upon login with google
const googleSuccessRedirect = (req,res) => {
    //redirect to webapp homepage
    res.redirect(process.env.APP_URI)
}


//signUp method (creates a user document in db)
const signUp = (req,res) => {

    //validate signup
    const userData = req.body

    //check for Email
    User.findOne({
        email:userData.email
    },(err,data) => {
        if(err)
        {
            //no email exists
            console.log("Error with database");
            res.statusMessage = 'Error DB connection'
            res.status(500).end()
        }
        else
        {
            if(data)
            {
                //email already exists
                res.statusMessage = 'Email Already exists'
                res.status(400).end()    
            }
            else
            {
                //sign up
                const user = new User(userData)
                //create password
                bcrypt.hash(user.password,10,(err,hash) => {
                    user.password = hash
                    //create doc in database
                    user.save(async (err,data) => {
                    if(err)
                        {
                            console.log("Error creating doc ")
                        }
                        else
                        {
                            //res.json(data)
                            //create a token instance
                            const token = new Token({
                                userId: data._id,
                                token: crypto.randomBytes(32).toString('hex') 
                            })
                            let tok = await token.save();
                            //send verification email
                            await sendEmail(user.email,'Verify Email',` please verify your email address by visiting this link`,` ${process.env.BASE_URL}verify/${user.id}/${tok.token}`)
                            res.send("Email sent to your account please verify ")
                        }
                    })                
                })

            }
        }
    })
    //check for empty fields
}

//verify useremail
const verifyUser = async (req,res) => {
    const {id, token} = req.params
    //get user from database
    const user = await User.findById(id)
    if(!user)
    {
        res.send("Invalid Link")
    }
    else
    {
        const tok = await Token.findOne({
            token:token
        })
        if(!tok)
        {
            res.send("Invalid Link")
        }
        else
        {
            //update user doc
            await User.findByIdAndUpdate(id,{
                verified:true
            })
            //remove user doc
            await Token.findByIdAndRemove(tok._id)
            res.send("Email verified! ")
            //Session base auth grant
            
        }
    }
}


//check whether user is authentic
const isAuthentic = (req,res) => {
    //console.log(req.user)
    if(req.user)
    {
        res.json(req.user)
    }
    else
    {
        //console.log(req)
        res.statusMessage = "UnAuthorized"
        res.status(401).end()
    }
}


const logoutUser = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            res.status(500).send("Error With Logout");
        }
        else
        {
            res.send("Logout");
            console.log(req.session)
        }
    })
}


module.exports = {
    loginUser,
    signUp,
    verifyUser,
    redirectUser,
    isAuthentic,
    logoutUser,
    loginWithGoogle,
    googleFailRedirect,
    googleSuccessRedirect,
    loginWithFacebook,
    facebookLoginRedirect,
    facefail,
    facesuccess
}