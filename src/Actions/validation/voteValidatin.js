import validator from 'validator';
import '../../components/Login/Login.scss'
import React from 'react';


let signUpSuccessValue = {
  "username":false,
  "email":false,
  "password":false,
};
const errorMessage = (value)=>{
  return <div className="infoMessage"><div className="iconInfo"/>
    <div className="text_messageInfo">{value}</div>
  </div>

};
const required = (value) => {
  if (!value.toString().trim().length) {
    signUpSuccessValue.required = false
    return errorMessage("The value is required.")
  }else {
    signUpSuccessValue.required = true
  }
};
const username = (value) => {
  if (value.toString().length < 4) {
    signUpSuccessValue.username = false
    return errorMessage("The username must be more 3 length")
  }else {
    signUpSuccessValue.username = true
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    signUpSuccessValue.email = false;
    let message =value +" is not a valid email.";
    return  errorMessage(message)
  }else {
    signUpSuccessValue.email = true
  }
};

function signUpSuccess(){
  if(signUpSuccessValue.username && signUpSuccessValue.email && signUpSuccessValue.password){
    return true;
  }
  return false
};
function loginSuccess(){
  if(signUpSuccessValue.required&& signUpSuccessValue.username){
    return true;
  }
  return false
};

const password = (value, props, components) => {
  if (value !== components['Password'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    signUpSuccessValue.password = false
    return  errorMessage("incorrect password ")
  }else {
    signUpSuccessValue.password = true
  }

};
export const voteValidation = {
  required,
  email,
  password,
  signUpSuccess,
  loginSuccess,
  errorMessage,
  username
};