import React, { useState } from "react";
import Button from '../components/Button'
import { useNavigate } from "react-router-dom";
import InputField from '../components/InputField'
import '../styles.css'

export const Login = () => {
  const [e, setEmail] = useState();
  const [p, setPassword] = useState();

  let localStorageE = localStorage.getItem('email');
  let localStorageP = localStorage.getItem('password');


  let navigate = useNavigate();
  const toMain = () => {
    let path = `/home`;
    navigate(path);
  }

  function successfulRegistration() {
    if((localStorageE === e) && (localStorageP === p)){
      toMain();
      } else {
        alert('Please enter an existing user');
      }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">I T U  C H A T</span>
        <h2 className="title">Login</h2>
        <form action="">
          <InputField className='inputEmail' id='email' label='e-mail' placeholder='example@itu.dk' type='email' onChange={(e) => setEmail(e.target.value)}></InputField>
          <InputField className='inputPassword' id='password' label='password' placeholder='Enter a password' type='password' onChange={(e) => setPassword(e.target.value)}></InputField>
          <Button className="fluid-btn primary" text='Login' icon='' onClick={successfulRegistration}></Button>
        </form>
        <span className="loginLink">Don't have an account yet? <a href="/Register">Create an account</a></span>
      </div>
    </div>
  )
}
export default Login;