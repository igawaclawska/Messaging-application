import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

import "../styles.css";
import "../buttons.css";

export const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setName] = useState(null);
  const [passwordRepeated, setPasswordRepeated] = useState();
  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toMain();
    } catch (err) {
      alert("Please enter an existing user");
      setErr(true);
    }
  };
  let navigate = useNavigate();
  const toMain = () => {
    let path = `/home`;
    navigate(path);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">I T U C H A T</span>
        <h2 className="title">Login</h2>
        <form action="">
          <div className="input-element">
            <InputField
              className="inputEmail"
              id="email"
              label="e-mail"
              placeholder="example@itu.dk"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></InputField>
          </div>
          <div className="input-element">
            <InputField
              className="inputPassword"
              id="password"
              label="password"
              placeholder="Enter a password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputField>
          </div>
          <Button
            className="fluid-btn primary"
            text="Login"
            icon=""
            onClick={handleSubmit}
          ></Button>
        </form>
        <span className="loginLink">
          Don't have an account yet? <a href="/Register">Create an account</a>
        </span>
      </div>
    </div>
  );
};
export default Login;
