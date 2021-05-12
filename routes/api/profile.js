const express = require('express');
const passport = require('passport')
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../../models/profile')
const User = require('../../models/usersModel')
router.get('/test',(req,res)=>{
    res.json({
        message:'profile test works'
    })
})

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors ={};
    Profile.findOne({user:req.user.id}).then(user=>{
        if(!user){
            errors.noProfile='there is no profile found for this user'
            return res.status(404).json(errors)
        }
        res.json(user)
    }).catch(err=>res.status(404).json(err))
})
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields ={};
    profileFields.user=req.user.id;
    if(req.body.name) {
        profileFields.name=req.user.name;
    }
    if(req.body.email) {
        profileFields.email=req.user.email;
    }
    if(req.body.phone) {
        profileFields.phone=req.user.phone;
    }
  Profile.findOne({user:req.user.id}).then(profile=>{
      if(profile){
          Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}).then(profile=>{
              res.json(profile)
          })
      }else{
        profile.findOne({user:profileFields.id}).then(profile=>{
            if(profile){
                errors.handle='handel already exists';
                res.status(400).json(errors)
            }
            new Profile(profileFields).save().then(profile=>{
                res.json(profile)
            })
        })
      }
  })
})
module.exports=router;