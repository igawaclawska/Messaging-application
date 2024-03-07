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
    error: "",
    firstAttempt: true,
  });

  const adaptState = (prevState, event, testFunction) => {
    const input = event.target.value;
    let errorMsg = testFunction(input);
    let newState = { ...prevState, value: input };

    if (prevState.firstAttempt !== true) {
      newState = { ...newState, error: errorMsg };
    }
    if (event.type === "blur") {
      newState = { ...newState, error: errorMsg, firstAttempt: false };
    }

    return newState;
  };

  const handleEmail = (event) => {
    setEmail((prevState) => adaptState(prevState, event, testEmail));
  };

  const handlePassword = (event) => {
    setPassword((prevState) => adaptState(prevState, event, testPassword));
  };

  const handleExistingPassword = (event) => {
    setPassword((prevState) =>
      adaptState(prevState, event, testPasswordExistence)
    );
  };

  const handleDisplayName = (event) => {
    setDisplayName((prevState) =>
      adaptState(prevState, event, testDisplayName)
    );
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
