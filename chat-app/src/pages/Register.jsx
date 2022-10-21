import React from 'react'
import Button from '../components/Button'
import InputField from '../components/InputField'
import '../styles.css'

export const Register = () => {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">I T U  C H A T</span>
            <h2 className="title">Register</h2>
            <form action="">
              <InputField className='inputName' id='name' label='name' placeholder='Enter your name' type='text'></InputField>
              <InputField className='inputEmail' id='email' label='e-mail' placeholder='example@itu.dk' type='email'></InputField>
              <InputField className='inputPassword' id='password' label='password' placeholder='Enter a password' type='password'></InputField> 
              <InputField className='inputRepeatPassword' id='repratPassword' label='repeat password' placeholder='Repeat password' type='password'></InputField>                              
              <Button className="primaryBtn" text='Create account'></Button>
            </form>
            <span className="loginLink">Already have an account? <a href="#">Login</a></span>
        </div>
    </div>
  )
}
export default Register;