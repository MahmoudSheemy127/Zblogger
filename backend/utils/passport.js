const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()
// var GoogleStrategy = require('passport-google-oauth20').Strategy
var GoogleStrategy = require('passport-google-oauth20')
var FacebookStrategy = require('passport-facebook').Strategy
//use different strategies with passport

//middleware for the passport object

//enable local strategy
passport.use(new LocalStrategy(
    function(username,password,done)
    {
        console.log("Shinky test")
        User.findOne({email:username},(err,data) => {
            if(data)
            {
                console.log("From local ",data)
                //email exists
                //check password
                bcrypt.compare(password,data.password,(err,res) => {
                        if(err)
                        {
                            //unmatched passwords
                            return done(err)
                        }
                        if(!res)
                        {
                            return done(null,false)
                        }
                        //password matching
                        done(null,data)
                })
                    
            }
            else
            {
                if(err)
                {
                    done(err)
                }
                else
                {
                    done(null,false)
                }
            }
        })
    }
))


//enable google-oauth-2.0 strategy
passport.use(new GoogleStrategy({
    //options to access the google-oauth0 via the consent screen
    clientID:process.env['GOOGLE_CLIENT_ID'],
    clientSecret:process.env['GOOGLE_CLIENT_SECRET'],  
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: [ 'profile', 'email' ],
    state: true
},function verify(accessToken, refreshToken, profile, cb){
    //check for user
    console.log(profile)
    const email = profile.emails[0].value
    //get email
    User.find({email:email},(err,data) => 
    {
        if(err)
        {
            //db error
            cb(err)
        }
        else
        {
            if(data.length)
            {
                //user with the specific email is found
                cb(null,data[0])
            }
            else
            {
                //user not found
                //create new user in our DB
                User.create({
                    email:profile.emails[0].value,
                    userName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                }, (err,data) => {
                    if(err)
                    {
                        //db err
                        cb(err)
                    }
                    else
                    {
                        //serialize new user
                        cb(null,data)
                    }
                })
            }
        }
    })
}   
)); 



//enable facebook oauth strategy
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ["email", "name"]
},
(accessToken,refreshToken,profile,cb) => {
    console.log(profile)
    
    const email = profile.emails[0].value
    //get email
    User.find({email:email},(err,data) => 
    {
        if(err)
        {
            //db error
            cb(err)
        }
        else
        {
            if(data.length)
            {
                //user with the specific email is found
                cb(null,data[0])
            }
            else
            {
                //user not found
                //create new user in our DB
                User.create({
                    email:profile.emails[0].value,
                    userName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                }, (err,data) => {
                    if(err)
                    {
                        //db err
                        cb(err)
                    }
                    else
                    {
                        //serialize new user
                        cb(null,data)
                    }
                })
            }
        }
    })
}
))




//Store user id in the active session
passport.serializeUser((user,done) => {
    done(null,user.id)
})


//use id stored in the active session and retrieve the whole user object and store in the session.user
passport.deserializeUser((id,done) => {
    User.findById(id,(err,data) => {
        if(err)
        {
            done(err)
        }
        else
        {
            done(null,data)
        }
    })
})