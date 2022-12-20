import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../buttons.css";
import "../styles.css";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setName] = useState(null);
  const [displayNameLowerCase, setDisplayNameLowerCase] = useState(null);
  const [passwordRepeated, setPasswordRepeated] = useState();

  const writeUserData = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName,
          // displayNameLowerCase,
        });
        console.log(res);
        const addUser = await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          displayNameLowerCase,
          email,
        });
        //create empty chats
        const addChat = await setDoc(doc(db, "userChats", res.user.uid), {});
        //create empty group chats
        const addGroupChat = await setDoc(
          doc(db, "groupChat", res.user.uid),
          {}
        );
        toMain();
      } catch (err) {
        console.log("error", err);
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  };

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
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ITU CHAT</span>
        <h2 className="title">Register</h2>
        <form className="form">
          <InputField
            className="inputName"
            id="fullname"
            label="fullname"
            value={displayName}
            placeholder="Enter your name"
            type="text"
            onChange={(event) => {
              let name = event.target.value;
              setName(name);
              let nameLowercase = name.toLowerCase();
              setDisplayNameLowerCase(nameLowercase);
            }}
          ></InputField>
          <InputField
            className="inputEmail"
            id="email"
            value={email}
            label="e-mail"
            placeholder="example@itu.dk"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          ></InputField>
          <InputField
            className="inputPassword"
            id="password"
            value={password}
            label="password"
            placeholder="Enter a password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          ></InputField>
          <InputField
            className="inputRepeatPassword"
            id="repeatPassword"
            value={passwordRepeated}
            label="repeat password"
            placeholder="Repeat password"
            type="password"
            onChange={(event) => setPasswordRepeated(event.target.value)}
          ></InputField>
          <Button
            className="fluid-btn primary"
            text="Create account"
            icon=""
            onClick={validateCredentials}
          ></Button>
        </form>
        <span className="login-link">
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};
export default Register;
