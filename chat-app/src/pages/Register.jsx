import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthFormData } from "../hooks/useAuthFormData.js";
import { Player } from "@lottiefiles/react-lottie-player";
import LottiePlayer from "../components/LottiePlayer.jsx";

export const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    email,
    handleEmailInput,
    password,
    handlePasswordInput,
    displayName,
    handleDisplayNameInput,
    displayNameLowerCase,
    passwordRepeated,
    handlePasswordRepeatedInput,
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

  function validateInput() {
    if (
      /^[A-Za-z0-9._%+-]+@itu\.dk$/.test(email) &&
      password.length >= 6 &&
      password === passwordRepeated &&
      displayName !== null
    ) {
      return true;
    } else if (password.length < 6) {
      alert("Password needs to be at least 6 characters long");
      return false;
    } else if (password !== passwordRepeated) {
      alert("Passwords don't match");
      return false;
    } else if (
      email.length === 0 ||
      /^[A-Za-z0-9._%+-]+@itu\.dk$/.test(email) === false
    ) {
      alert("Your email must end up with @itu.dk");
      return false;
    } else if (displayName === null) {
      alert("Name field can't be blank.");
      return false;
    } else {
      alert(
        "You have entered an invalid email or a password with less than 5 characters."
      );
      return false;
    }
  }
  const navigateToMain = () => {
    let path = "/home";
    navigate(path);
  };

  const navigateToLogIn = () => {
    let path = "/login";
    navigate(path);
  };

  function registerUser() {
    if (validateInput()) {
      writeUserData();
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">MINI CHAT</span>
        <h2 className="title">Register</h2>
        <form className="form">
          <InputField
            className="input-name"
            id="full-name"
            label="Full name"
            value={displayName}
            type="text"
            onChange={handleDisplayNameInput}
          ></InputField>
          <InputField
            className="input-email"
            id="email"
            value={email}
            label="E-mail"
            placeholder="example@itu.dk"
            type="email"
            onChange={handleEmailInput}
          ></InputField>
          <InputField
            className="input-password"
            id="password"
            value={password}
            label="Password"
            type="password"
            onChange={handlePasswordInput}
          ></InputField>
          <InputField
            className="input-repeat-password"
            id="repeat-password"
            value={passwordRepeated}
            label="Repeat password"
            type="password"
            onChange={handlePasswordRepeatedInput}
          ></InputField>
          <Button className="fluid-btn primary" onClick={registerUser}>
            {loading ? (
              <LottiePlayer
                src={"spinner.json"}
                width={"19px"}
                height={"19px"}
              />
            ) : (
              "Create account"
            )}
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
