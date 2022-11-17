import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../buttons.css";
import "../styles.css";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setName] = useState(null);
  const [passwordRepeated, setPasswordRepeated] = useState();

  const writeUserData = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName,
        });
        console.log(res);
        const addUser = await addDoc(collection(db, "users"), {
          uid: res.user.uid,
          displayName,
          email,
        });
        //create empty chats
        const addChat = await addDoc(collection(db, "userChats", res.user.uid, displayName ), {});
        toMain()
      } catch (err) {
        console.log("error", err)
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  }

  function reg() {
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
  const toMain = () => {
    let path = "/home";
    navigate(path);
  };

  function validateCredentials() {
    if (reg()) {
      writeUserData();
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">I T U C H A T</span>
        <h2 className="title">Register</h2>
        <form className="form" >
          <InputField
            className="inputName"
            id="fullname"
            label="fullname"
            value={displayName}
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></InputField>
          <InputField
            className="inputEmail"
            id="email"
            value={email}
            label="e-mail"
            placeholder="example@itu.dk"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputField>
          <InputField
            className="inputPassword"
            id="password"
            value={password}
            label="password"
            placeholder="Enter a password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputField>
          <InputField
            className="inputRepeatPassword"
            id="repeatPassword"
            value={passwordRepeated}
            label="repeat password"
            placeholder="Repeat password"
            type="password"
            onChange={(e) => setPasswordRepeated(e.target.value)}
          ></InputField>
          <Button
            className="fluid-btn primary"
            text="Create account"
            icon=""
            onClick={validateCredentials}
          ></Button>
        </form>
        <span className="loginLink">
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};
export default Register;
