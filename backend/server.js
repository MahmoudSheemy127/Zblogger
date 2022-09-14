const express = require('express');
const session = require('express-session');
const cors = require('cors')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
// const db = require('./config/db');

require('./config/db');
require('dotenv').config()


const app = express()

//set EJS as templating engine
app.set("view engine", "ejs");

//apply middlewares (These middlewares are activated upon firing http requests)
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

// app.use(cors());

//parse json data
//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Create Mongo store for storing session
const sessionStorage = new MongoStore({
    mongooseConnection:mongoose.connection,
    collection:"sessions"
})


//use sessions
app.use(session({
    secret:"thisisasecrectsession",
    resave:false,
    store:sessionStorage,
    saveUninitialized:true
}))

app.use(cookieParser("thisisasecrectsession"));

//initialize passport which is an authentication middleware
app.use(passport.initialize())
app.use(passport.session())

require('./utils/passport')


app.use('/',require('./routes/authRouter'));
app.use('/img',require('./routes/imgRouter'));
app.use('/blog',require('./routes/blogRouter'))
app.use('/comment',require('./routes/commentRouter'))
app.use('/user',require('./routes/userRouter'));
//app.use('/follow',require('./routes/followRouter'));

app.listen(process.env.PORT,() => {
    console.log("Server is running at port ",process.env.PORT)
})



