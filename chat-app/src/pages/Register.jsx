import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthFormData } from "../hooks/useAuthFormData.js";

export const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    email,
    emailErrorMsg,
    handleEmailInput,
    handleEmailOnBlur,
    password,
    passwordErrorMsg,
    handlePasswordInput,
    handlePasswordOnBlur,
    displayName,
    displayNameErrorMsg,
    handleDisplayNameInput,
    handleDisplayNameOnBlur,
    displayNameLowerCase,
  } = useAuthFormData();

  const writeUserData = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName,
        });
        console.log(res);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          displayNameLowerCase,
          email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigateToMain();
      } catch (err) {
        console.log("error status:", error);
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const navigateToMain = () => {
    let path = "/home";
    navigate(path);
  };

  const navigateToLogIn = () => {
    let path = "/login";
    navigate(path);
  };

  function registerUser(e) {
    e.preventDefault();
    if (displayName && email && password) {
      writeUserData();
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">MINI CHAT</span>
        <h2 className="title">Register</h2>
        <form onSubmit={registerUser} className="form">
          <InputField
            className="input-name"
            id="full-name"
            label="Full name"
            value={displayName}
            type="text"
            onChange={handleDisplayNameInput}
            helperText={displayNameErrorMsg}
            onBlur={handleDisplayNameOnBlur}
          ></InputField>
          <InputField
            className="input-email"
            id="email"
            value={email}
            label="E-mail"
            placeholder="example@itu.dk"
            type="email"
            onChange={handleEmailInput}
            helperText={emailErrorMsg}
            onBlur={handleEmailOnBlur}
          ></InputField>
          <InputField
            className="input-password"
            id="password"
            value={password}
            label="Password"
            type="password"
            onChange={handlePasswordInput}
            onBlur={handlePasswordOnBlur}
            helperText={passwordErrorMsg}
          ></InputField>
          <Button
            className="fluid-btn primary"
            onClick={registerUser}
            loading={loading}
          >
            Create account
          </Button>
        </form>
        <button onClick={navigateToLogIn} className="button-link-text">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};
export default Register;
