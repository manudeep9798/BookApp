const { default: validator } = require('validator');
const Validator= require('validator');
const isEmpty = require('./is-empty');

module.exports=function ValidateLoginInput(data){
    let errors={};
  
    data.email = !isEmpty(data.email)?data.email:'';
    data.password = !isEmpty(data.password)?data.password:'';
  

    if(!validator.isEmail(data.email)){
        errors.email='email is invaild';
    }
    if(validator.isEmpty(data.email)){
        errors.email='email is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password='password is required';
    }
   

    return{
        errors,
        isValid:isEmpty(errors)
    }
}
