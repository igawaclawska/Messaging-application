import { useState } from "react";

export const useAuthFormData = () => {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [emailAttempt, setEmailAttempt] = useState(0);

  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordAttempt, setPasswordAttempt] = useState(0);

  const [displayName, setDisplayName] = useState("");
  const [displayNameErrorMsg, setDisplayNameErrorMsg] = useState("");
  const [displayNameAttempt, setDisplayNameAttempt] = useState(0);

  const [displayNameLowerCase, setDisplayNameLowerCase] = useState("");

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValue = (value) => {
    return value.trim() !== "";
  };

  const validateEmail = (email) => {
    if (!isValue(email)) {
      setEmailErrorMsg("Email is required");
    } else if (!isEmailValid(email)) {
      setEmailErrorMsg("Invalid format");
    } else setEmailErrorMsg("");
  };

  const handleEmailInput = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (emailAttempt > 0) {
      validateEmail(email);
    }
  };

  const handleEmailOnBlur = (e) => {
    const email = e.target.value;
    validateEmail(email);
    setEmailAttempt((prev) => prev + 1);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const validatePassword = (password) => {
    if (!isValue(password)) {
      setPasswordErrorMsg("Password is required");
    } else if (!isPasswordValid(password)) {
      setPasswordErrorMsg("Use password that has 6 or more characters");
    } else setPasswordErrorMsg("");
  };

  const handlePasswordInput = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (passwordAttempt > 0) {
      validatePassword(password);
    }
  };

  const handlePasswordOnBlur = (e) => {
    const password = e.target.value;
    validatePassword(password);
    setPasswordAttempt((prev) => prev + 1);
  };

  const validateDisplayName = (userName) => {
    if (!isValue(userName)) {
      setDisplayNameErrorMsg("Name is required");
    } else setDisplayNameErrorMsg("");
  };

  const handleDisplayNameInput = (e) => {
    let name = e.target.value;
    let nameLowercase = name.toLowerCase();

    setDisplayName(name);
    setDisplayNameLowerCase(nameLowercase);

    if (displayNameAttempt > 0) {
      validateDisplayName(name);
    }
  };

  const handleDisplayNameOnBlur = (e) => {
    const userName = e.target.value;
    validateDisplayName(userName);
    setDisplayNameAttempt((prev) => prev + 1);
  };

  return {
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
  };
};
