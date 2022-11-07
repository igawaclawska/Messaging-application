import React, { useState } from "react";
import Button from '../components/Button'
import InputField from '../components/InputField'
import '../styles.css'
import { useNavigate } from "react-router-dom";
import '../buttons.css'

export const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullname, setName] = useState(null);
  const [passwordRepeated, setPasswordRepeated] = useState();


  function reg() {
    if (
      (/^[A-Za-z0-9._%+-]+@itu\.dk$/.test(email)) &&
      (password.length >= 5) && (password === passwordRepeated) && (fullname !== null)
    ) {
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      return true;
    }
     else if (password.length < 5){
      alert(
        "Password needs to be at least 5 characters long"
      );
      return false;

    } else if (password !== passwordRepeated){
      alert(
        "Passwords don't match"
      )
      return false;

    } else if (email.length === 0 || (/^[A-Za-z0-9._%+-]+@itu\.dk$/.test(email)) === false) {
      alert(
        "Your email must end up with @itu.dk"
      )
      return false;

    } else if (fullname === null){
      alert(
        "Name field can't be blank."
      )
      return false;
    } 
    else {
      alert(
        "You have entered an invalid email or a password with less than 5 characters."
      )
      return false;
    }
  }

  let navigate = useNavigate();
  const toMain = () => {
    let path = `/home`;
    navigate(path);
  }

  function successfulRegistration() {
    if(reg()) {
      toMain();
    } 
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">I T U  C H A T</span>
        <h2 className="title">Register</h2>
        <form className='form' action="">
            <div className='input-element'><InputField className='inputName' id='fullname' label='fullname' value={fullname} placeholder='Enter your name' type='text' onChange={(e) => setName(e.target.value)}></InputField></div>
            <div className='input-element'><InputField className='inputEmail' id='email' value={email} label='e-mail' placeholder='example@itu.dk' type='email' onChange={(e) => setEmail(e.target.value)}></InputField></div>
            <div className='input-element'><InputField className='inputPassword' id='password' value={password} label='password' placeholder='Enter a password' type='password' onChange={(e) => setPassword(e.target.value)}></InputField></div>
            <div className='input-element'><InputField className='inputRepeatPassword' id='repeatPassword' value={passwordRepeated} label='repeat password' placeholder='Repeat password' type='password' onChange={(e) => setPasswordRepeated(e.target.value)}></InputField></div>
            <Button className="fluid-btn primary" text='Create account' icon='' onClick={successfulRegistration}></Button>
        </form>
        <span className="loginLink">Already have an account? <a href="/login">Login</a></span>
      </div>
    </div>
  )
}
export default Register;