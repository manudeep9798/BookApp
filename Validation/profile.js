const { default: validator } = require('validator');
const Validator= require('validator');
const isEmpty = require('./is-empty');

module.exports=function ValidateProfileInput(data){
    let errors={};
  
    data.user = !isEmpty(data.user)?data.user:'';
    data.name = !isEmpty(data.name)?data.name:'';
    data.email = !isEmpty(data.email)?data.email:'';
  

    if(!validator.isLength(data.user)){
        errors.user='id not found';
    }
    if(validator.isEmpty(data.user)){
        errors.user='user is required';
    }
    if(validator.isEmpty(data.name)){
        errors.name='name is required';
    }   
    if(validator.isEmpty(data.email)){
        errors.email='email is required';
    }
    

    return{
        errors,
        isValid:isEmpty(errors)
    }
}
