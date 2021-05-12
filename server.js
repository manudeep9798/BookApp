const express= require('express')
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const users= require('./routes/api/users');
const profile= require('./routes/api/profile');
const Books= require('./routes/api/Book');

const passport= require('passport')
const jwt = require('jsonwebtoken')

const app= express();
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const url='mongodb://localhost/BookApp'
mongoose.connect(url,{useNewUrlParser:true})
const con =mongoose.connection;

con.on('open', ()=>{
    console.log('connected...');
})


const port =process.env.PORT || 5000
//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/book',Books)

app.listen(port,()=>{
    console.log('server running on ',port);
})

