import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthFormData } from "../../hooks/useAuthFormData.js";
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/input-field/InputField.jsx";

export const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    email,
    emailError,
    handleEmail,
    password,
    passwordError,
    handlePassword,
    displayName,
    displayNameError,
    handleDisplayName,
  } = useAuthFormData();

  const writeUserData = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName: displayName.value,
        });
        console.log(res);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: displayName,
          displayNameLowerCase: displayName.toLowerCase(),
          email: email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigateToMain();
      } catch (err) {
        console.error(err);
        setError(true);
      }
    } catch (err) {
      console.error(err);
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
    if (
      displayName &&
      email &&
      password &&
      !displayNameError &&
      !emailError &&
      !passwordError
    ) {
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
            type="text"
            value={displayName}
            onChange={handleDisplayName}
            helperText={displayNameError}
            onBlur={handleDisplayName}
            error={displayNameError}
          ></InputField>
          <InputField
            className="input-email"
            id="email"
            label="E-mail"
            placeholder="example@email.com"
            type="email"
            onChange={handleEmail}
            helperText={emailError}
            onBlur={handleEmail}
            error={emailError}
          ></InputField>
          <InputField
            className="input-password"
            id="password"
            label="Password"
            placeholder="6 or more characters"
            type="password"
            onChange={handlePassword}
            onBlur={handlePassword}
            helperText={passwordError}
            error={passwordError}
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
