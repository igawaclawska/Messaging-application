import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthFormData } from "../../hooks/useAuthFormData.js";
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/input-field/InputField.jsx";

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    email,
    emailError,
    handleEmail,
    existingPassword,
    existingPasswordError,
    handleExistingPassword,
  } = useAuthFormData();

  const handleSubmit = async () => {
    if (email && existingPassword && !emailError && !existingPasswordError) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, existingPassword);
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
              helperText={emailError}
              onChange={handleEmail}
              onBlur={handleEmail}
              error={emailError}
            ></InputField>
          </div>
          <div className="input-element">
            <InputField
              className="input-password"
              id="password"
              label="Password"
              type="password"
              helperText={existingPasswordError}
              onChange={handleExistingPassword}
              onBlur={handleExistingPassword}
              error={existingPasswordError}
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
