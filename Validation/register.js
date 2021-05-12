const { default: validator } = require('validator');
const Validator= require('validator');
const isEmpty = require('./is-empty');

module.exports=function ValidateRegisterInput(data){
    let errors={};
    data.name = !isEmpty(data.name)?data.name:'';
    data.email = !isEmpty(data.email)?data.email:'';
    data.password = !isEmpty(data.password)?data.password:'';
    data.password2 = !isEmpty(data.password2)?data.password2:'';


    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name='name must be between 2 and 30 characters';
    }
    
    if(validator.isEmpty(data.name)){
        errors.name='name is required';
    }
    if(validator.isEmpty(data.email)){
        errors.email='email is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email='email is invaild';
    }
    if(validator.isEmpty(data.password)){
        errors.password='password is required';
    }
    if(!validator.isLength(data.password,{min:6,max:30})){
        errors.password='password must be atleast 6 characters';
    }
    if(validator.isEmpty(data.password2)){
        errors.password2='please confirm password';
    }
    if(!validator.equals(data.password2,data.password)){
        errors.password2='passwords does not match';
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}
