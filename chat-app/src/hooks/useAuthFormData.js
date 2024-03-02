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

  const testEmail = (email) => {
    if (!isValue(email)) {
      return "Email is required";
    } else if (!isEmailValid(email)) {
      return "Invalid format";
    } else return "";
  };

  const handleEmailInput = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (emailAttempt > 0) {
      let errorMsg = testEmail(email);
      setEmailErrorMsg(errorMsg);
    }
  };

  const handleEmailOnBlur = (e) => {
    const email = e.target.value;
    let errorMsg = testEmail(email);
    setEmailErrorMsg(errorMsg);
    setEmailAttempt((prev) => prev + 1);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const testPassword = (password) => {
    if (!isValue(password)) {
      return "Password is required";
    } else if (!isPasswordValid(password)) {
      return "Use password that has 6 or more characters";
    } else return "";
  };

  const testPasswordExistence = (password) => {
    if (!isValue(password)) {
      return "Password is required";
    } else return "";
  };

  const handlePasswordInput = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (passwordAttempt > 0) {
      let errorMsg = testPassword(password);
      setPasswordErrorMsg(errorMsg);
    }
  };

  const handlePasswordOnBlur = (e) => {
    const password = e.target.value;
    let errorMsg = testPassword(password);
    setPasswordErrorMsg(errorMsg);
    setPasswordAttempt((prev) => prev + 1);
  };

  const handleExistingPasswordInput = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (passwordAttempt > 0) {
      let errorMsg = testPasswordExistence(password);
      setPasswordErrorMsg(errorMsg);
    }
  };

  const handleExistingPasswordOnBlur = (e) => {
    const password = e.target.value;
    let errorMsg = testPasswordExistence(password);
    setPasswordErrorMsg(errorMsg);
    setPasswordAttempt((prev) => prev + 1);
  };

  const testDisplayName = (userName) => {
    if (!isValue(userName)) {
      return "Name is required";
    } else return "";
  };

  const handleDisplayNameInput = (e) => {
    let name = e.target.value;
    let nameLowercase = name.toLowerCase();

    setDisplayName(name);
    setDisplayNameLowerCase(nameLowercase);

    if (displayNameAttempt > 0) {
      let errorMsg = testDisplayName(name);
      setDisplayNameErrorMsg(errorMsg);
    }
  };

  const handleDisplayNameOnBlur = (e) => {
    const userName = e.target.value;
    let errorMsg = testDisplayName(userName);
    setDisplayNameErrorMsg(errorMsg);
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
    handleExistingPasswordInput,
    handleExistingPasswordOnBlur,
    displayName,
    displayNameErrorMsg,
    handleDisplayNameInput,
    handleDisplayNameOnBlur,
    displayNameLowerCase,
  };
};
