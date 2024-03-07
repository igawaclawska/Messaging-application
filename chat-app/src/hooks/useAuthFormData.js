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

  const handleEmail = (e) => {
    const emailInput = e.target.value;
    let errorMsg = testEmail(emailInput);
    setEmail((prevState) => ({
      ...prevState,
      value: emailInput,
    }));
    if (email.firstAttempt !== true) {
      setEmail((prevState) => ({ ...prevState, error: errorMsg }));
    }
    if (e.type === "blur") {
      setEmail((prevState) => ({
        ...prevState,
        error: errorMsg,
        firstAttempt: false,
      }));
    }
  };

  const handlePassword = (e) => {
    const passwordInput = e.target.value;
    let errorMsg = testPassword(passwordInput);
    setPassword((prevState) => ({ ...prevState, value: passwordInput }));
    if (password.firstAttempt !== true) {
      setPassword((prevState) => ({ ...prevState, error: errorMsg }));
    }
    if (e.type === "blur") {
      setPassword((prevState) => ({
        ...prevState,
        error: errorMsg,
        firstAttempt: false,
      }));
    }
  };

  const handleExistingPassword = (e) => {
    const passwordInput = e.target.value;
    let errorMsg = testPasswordExistence(passwordInput);
    setPassword((prevState) => ({ ...prevState, value: passwordInput }));
    if (password.firstAttempt !== true) {
      setPassword((prevState) => ({ ...prevState, error: errorMsg }));
    }
    if (e.type === "blur") {
      setPassword((prevState) => ({
        ...prevState,
        error: errorMsg,
        firstAttempt: false,
      }));
    }
  };

  const handleDisplayName = (e) => {
    let nameInput = e.target.value;
    let nameLowercase = nameInput.toLowerCase();
    let errorMsg = testDisplayName(nameInput);

    setDisplayName((prevState) => ({
      ...prevState,
      value: nameInput,
      valueLowerCase: nameLowercase,
    }));
    if (displayName.firstAttempt !== true) {
      setDisplayName((prevState) => ({ ...prevState, error: errorMsg }));
    }
    if (e.type === "blur") {
      setDisplayName((prevState) => ({
        ...prevState,
        error: errorMsg,
        firstAttempt: false,
      }));
    }
  };

  return {
    email,
    handleEmail,
    password,
    handlePassword,
    handleExistingPassword,
    displayName,
    handleDisplayName,
  };
};
