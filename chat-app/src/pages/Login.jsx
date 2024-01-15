import './Login.css'
import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
    let path = "/home";
    navigate(path);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ITU CHAT</span>
        <h2 className="title">Login</h2>
        <form action="">
          <div className="input-element">
            <InputField
            // this class seems to not exist
              className="inputEmail"
              id="email"
              label="e-mail"
              placeholder="example@itu.dk"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            ></InputField>
          </div>
          <div className="input-element">
            <InputField
            // this class seems to not exist
              className="inputPassword"
              id="password"
              label="password"
              placeholder="Enter a password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
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
