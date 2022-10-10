import React from 'react'
import '.././styles.css'

export const Register = () => {
  return (
    <div className="formCotainer">
        <div className="formWrapper">
            <span className="logo">ITU Chat</span>
            <span className="title">Register</span>
            <form action="">
                <input type="text" className="inputName" placeholder="Enter your name"></input>
                <input type="email" className="inputEmail" placeholder="example@itu.dk"></input>
                <input type="password" className="inputPassword" placeholder="Enter a password"></input>                <button className="signUpBttn">Sign up</button>
            </form>
            <span className="loginLink">Already registered? <a href="#">Login</a></span>
        </div>
    </div>
  )
}
export default Register;