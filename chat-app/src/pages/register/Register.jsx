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
    handleEmail,
    password,
    handlePassword,
    displayName,
    handleDisplayName,
  } = useAuthFormData();

  const writeUserData = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      try {
        await updateProfile(res.user, {
          displayName: displayName.value,
        });
        console.log(res);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: displayName.value,
          displayNameLowerCase: displayName.value.toLowerCase(),
          email: email.value,
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
      displayName.value &&
      email.value &&
      password.value &&
      !displayName.error &&
      !email.error &&
      !password.error
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
            onChange={handleDisplayName}
            helperText={displayName.error}
            onBlur={handleDisplayName}
            error={displayName.error}
          ></InputField>
          <InputField
            className="input-email"
            id="email"
            label="E-mail"
            placeholder="example@email.com"
            type="email"
            onChange={handleEmail}
            helperText={email.error}
            onBlur={handleEmail}
            error={email.error}
          ></InputField>
          <InputField
            className="input-password"
            id="password"
            label="Password"
            placeholder="6 or more characters"
            type="password"
            onChange={handlePassword}
            onBlur={handlePassword}
            helperText={password.error}
            error={password.error}
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
