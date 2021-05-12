const mongoose = require('mongoose');


const Schema =mongoose.Schema;

const USerSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
       
    }
})


module.exports=User=mongoose.model('users',USerSchema)