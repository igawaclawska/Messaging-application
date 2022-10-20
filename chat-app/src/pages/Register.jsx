import React from 'react'
import Button from '../components/Button'
import '../styles.css'

export const Register = () => {
  return (
    <div className="formCotainer">
        <div className="formWrapper">
            <span className="logo">I T U  C H A T</span>
            <h2 className="title">Register</h2>
            <form action="">
                <label htmlFor="name" className="">Name</label>
                <input type="text" className="inputName" placeholder="Enter your name" ></input>
                <label htmlFor="email" className=""> E-mail</label>
                <input type="email" className="inputEmail" placeholder="example@itu.dk"></input>
                <label> Password</label>
                <input type="password" className="inputPassword" placeholder="Enter a password"></input>                
                <label> Repeat password</label>
                <input type="repeatPassword" className="inputRepeatPassword" placeholder="Repeat password"></input>                
                <Button className="primaryBtn" text='Create account'></Button>
            </form>
            <span className="loginLink">Already have an account? <a href="#">Login</a></span>
        </div>
    </div>
  )
}
export default Register;