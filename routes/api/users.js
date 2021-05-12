const express = require('express');
const router = express.Router();
const bcrpyt =require('bcryptjs')
const gravatar = require('gravatar')
const jwt= require('jsonwebtoken')
const User = require('../../models/usersModel');
const keys = require('../../config/keys')
const passport= require('passport')
const ValidateRegisterInput=require('../../Validation/register');
const ValidateLoginInput=require('../../Validation/Login');
router.get('/test',(req,res)=>{
    res.json({
        message:'user test works'
    })
})
//registration
router.post('/register',(req,res)=>{
    const {errors,isValid}= ValidateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json({
            error:errors
        })
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).send('email already exits!!')
        }else{
            const avatar= gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'
            });
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            });
            bcrpyt.genSalt(10,(err,salt)=>{
                bcrpyt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        newUser.password=hash;
                        newUser.save().then(user=>res.json(user))
                        .catch(err=>console.log(err))
                    }
                })
            })
        }
    })
})
//login
router.post('/login',async (req,res)=>{
    const {errors,isValid}= ValidateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json({
            error:errors
        })
    }
    const userName = await req.body.email;
    
    const password= await req.body.password;
    User.findOne({email:userName})
    .then(user=>{
        if(!user){
            return res.status(404).json({
                message:'no user found'
            })
        }
            bcrpyt.compare(password,user.password)
            .then(isMatch=>{
                if(isMatch){
                 
                    const payLoad={
                        id:user.id,
                        name:user.name,
                        avatar:user.avatar
                    }            
                      jwt.sign(payLoad,keys.secretOrKey,{expiresIn:3600000000000000},(err,token)=>{
                                if(err){
                                    return res.status(400).send('error')
                                }
                                res.json({
                                    success:true,
                                    token:'Bearer '+token
                                })
                      })
                    
                }else{
                    res.status(400).json({
                        msg:"password dosent match"
                    })
                }
            })
        
    })
})
//protected api
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        msg:'success',
        user:req.user
    })
})
module.exports=router;