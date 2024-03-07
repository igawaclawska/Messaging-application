import { useState } from "react";
import {
  testEmail,
  testPassword,
  testPasswordExistence,
  testDisplayName,
} from "../utils/validation";

export const useAuthFormData = () => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
    firstAttempt: true,
  });

  const [password, setPassword] = useState({
    value: "",
    error: "",
    firstAttempt: true,
  });

  const [displayName, setDisplayName] = useState({
    value: "",
    valueLowerCase: "",
    error: "",
    firstAttempt: true,
  });

  const handleEmailInput = (e) => {
    const emailInput = e.target.value;
    setEmail((prevState) => ({
      ...prevState,
      value: emailInput,
    }));
    if (email.firstAttempt !== true) {
      let errorMsg = testEmail(emailInput);
      setEmail((prevState) => ({ ...prevState, error: errorMsg }));
    }
  };

  const handleEmailOnBlur = (e) => {
    const emailInput = e.target.value;
    let errorMsg = testEmail(emailInput);
    setEmail((prevState) => ({
      ...prevState,
      error: errorMsg,
      firstAttempt: false,
    }));
  };

  const handlePasswordInput = (e) => {
    const passwordInput = e.target.value;
    setPassword((prevState) => ({ ...prevState, value: passwordInput }));
    if (password.firstAttempt !== true) {
      let errorMsg = testPassword(passwordInput);
      setPassword((prevState) => ({ ...prevState, error: errorMsg }));
    }
  };

  const handlePasswordOnBlur = (e) => {
    const passwordInput = e.target.value;
    let errorMsg = testPassword(passwordInput);
    setPassword((prevState) => ({
      ...prevState,
      error: errorMsg,
      firstAttempt: false,
    }));
  };

  const handleExistingPasswordInput = (e) => {
    const passwordInput = e.target.value;
    setPassword((prevState) => ({ ...prevState, value: passwordInput }));
    if (password.firstAttempt !== true) {
      let errorMsg = testPasswordExistence(passwordInput);
      setPassword((prevState) => ({ ...prevState, error: errorMsg }));
    }
  };

  const handleExistingPasswordOnBlur = (e) => {
    const passwordInput = e.target.value;
    let errorMsg = testPasswordExistence(passwordInput);
    setPassword((prevState) => ({
      ...prevState,
      error: errorMsg,
      firstAttempt: false,
    }));
  };

  const handleDisplayNameInput = (e) => {
    let nameInput = e.target.value;
    let nameLowercase = nameInput.toLowerCase();

    setDisplayName((prevState) => ({
      ...prevState,
      value: nameInput,
      valueLowerCase: nameLowercase,
    }));

    if (displayName.firstAttempt !== true) {
      let errorMsg = testDisplayName(nameInput);
      setDisplayName((prevState) => ({ ...prevState, error: errorMsg }));
    }
  };

  const handleDisplayNameOnBlur = (e) => {
    const nameInput = e.target.value;
    let errorMsg = testDisplayName(nameInput);
    setDisplayName((prevState) => ({
      ...prevState,
      error: errorMsg,
      firstAttempt: false,
    }));
  };

  return {
    email,
    handleEmailInput,
    handleEmailOnBlur,
    password,
    handlePasswordInput,
    handlePasswordOnBlur,
    handleExistingPasswordInput,
    handleExistingPasswordOnBlur,
    displayName,
    handleDisplayNameInput,
    handleDisplayNameOnBlur,
  };
};
