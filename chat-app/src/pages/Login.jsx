import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthFormData } from "../hooks/useAuthFormData.js";
import Button from "../components/Button";
import InputField from "../components/InputField";

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    email,
    emailErrorMsg,
    handleEmailInput,
    handleEmailOnBlur,
    password,
    passwordErrorMsg,
    handleExistingPasswordInput,
    handleExistingPasswordOnBlur,
  } = useAuthFormData();

  const handleSubmit = async () => {
    if (email && password && !emailErrorMsg && !passwordErrorMsg) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toMain();
      } catch (err) {
        console.error(err);
        setError("Invalid password or email");
      } finally {
        setLoading(false);
      }
    }
  };
  let navigate = useNavigate();
  const toMain = () => {
    let path = "/home";
    navigate(path);
  };

  const toRegister = () => {
    let path = "/register";
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
              label="E-mail"
              type="email"
              helperText={emailErrorMsg}
              onChange={handleEmailInput}
              onBlur={handleEmailOnBlur}
              error={emailErrorMsg}
            ></InputField>
          </div>
          <div className="input-element">
            <InputField
              className="input-password"
              id="password"
              label="Password"
              type="password"
              helperText={passwordErrorMsg}
              onChange={handleExistingPasswordInput}
              onBlur={handleExistingPasswordOnBlur}
              error={passwordErrorMsg}
            ></InputField>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <Button
            className="fluid-btn primary"
            onClick={handleSubmit}
            loading={loading}
          >
            Log in
          </Button>
        </form>
        <button onClick={toRegister} className="button-link-text">
          Don't have an account yet? Create an account
        </button>
      </div>
    </div>
  );
};
export default Login;
