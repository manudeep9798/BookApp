const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const BookSchema= new Schema({
    id:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
})


 module.exports=Book=mongoose.model('book',BookSchema)