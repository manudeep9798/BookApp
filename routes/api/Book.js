const { request } = require('express');
const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport= require('passport');
const Books = require('../../models/Books');
const Book = require('../../models/Books')
router.post('/test',(req,res)=>{
    res.json({msg:'posts works'})
})
router.post('/addBook',(req,res)=>{
    const newBook= new Book({
        id:req.body.id,
        title:req.body.title,
        author:req.body.author,
        rating:req.body.rating,
        description:req.body.description,
        likes:req.body.likes,
        price:req.body.price,
        cover:req.body.cover
    })
    newBook.save().then(book=>{
        res.json(book);
    })
})
router.post('/list',(req,res)=>{
    
   Books.find().then(book=>{
       res.json(book)
   })
})
router.post('/delete',async(req,res)=>{
    try{
        console.log(req.body.id);
        var id=await req.body.id;
        
        const book= await Books.findByIdAndDelete({_id:id});
        res.status(200).send(book)
    }
    catch(err){
        res.status(400).json({
            msg:"bad request"
        })}})
    router.post('/search',passport.authenticate('jwt',{session:false}),async(req,res)=>{
        searchBasedOn=req.body.option;
        console.log();
        searchVal=req.body.searchVal;
        if(searchBasedOn==='id'){
            const book= await Books.findOne({_id:searchVal});
            res.status(200).json(book)
        }else if(searchBasedOn==='title'){
            const book= await Books.find({title:searchVal})
            res.status(200).json(book)
        }else if(searchBasedOn==='author'){
            const book= await Books.find({author:searchVal})
            res.status(200).json(book)
        }else if(searchBasedOn==='minRating'){
            const book= await Books.find({ rating: { $gte: searchVal } })
            res.status(200).json(book)
        }
        else{
            res.json(null)
        }  
    })
    router.get('/details/:id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
        var id=req.params.id
        console.log(id);
        const book= await Books.findOne({_id:id});
        console.log(book);
            res.status(200).json(book) 
    })
module.exports=router;

// ,passport.authenticate('jwt',{session:false})