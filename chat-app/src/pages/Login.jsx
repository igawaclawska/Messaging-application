import "./Login.css";
import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthFormData } from "../hooks/useAuthFormData.js";

export const Login = () => {
  const [error, setError] = useState(false);

  const { email, handleEmailInput, password, handlePasswordInput } =
    useAuthFormData();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toMain();
    } catch (err) {
      alert("Please enter an existing user");
      setError(true);
      console.log(`error status:${error}`);
    }
  };
  let navigate = useNavigate();
  const toMain = () => {
    let path = "/home";
    navigate(path);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">MINI CHAT</span>
        <h2 className="title">Login</h2>
        <form action="">
          <div className="input-element">
            <InputField
              className="input-email"
              id="email"
              label="e-mail"
              placeholder="example@itu.dk"
              type="email"
              onChange={handleEmailInput}
            ></InputField>
          </div>
          <div className="input-element">
            <InputField
              className="input-password"
              id="password"
              label="password"
              placeholder="Enter a password"
              type="password"
              onChange={handlePasswordInput}
            ></InputField>
          </div>
          <Button
            className="fluid-btn primary"
            text="Login"
            icon=""
            onClick={handleSubmit}
          ></Button>
        </form>
        <span className="login-link">
          Don't have an account yet? <a href="/Register">Create an account</a>
        </span>
      </div>
    </div>
  );
};
export default Login;
