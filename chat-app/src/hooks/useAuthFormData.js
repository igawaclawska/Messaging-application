import { useState } from "react";
import {
  testEmail,
  testPassword,
  testPasswordExistence,
  testDisplayName,
} from "../utils/validation";

export const useAuthFormData = () => {
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
