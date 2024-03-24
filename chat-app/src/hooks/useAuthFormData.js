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

  const adaptState = (state, event, testFunction) => {
    const input = event.target.value;
    let errorMsg = testFunction(input);
    let newState = { ...state, value: input };

    if (state.firstAttempt !== true) {
      newState = { ...newState, error: errorMsg };
    }
    if (event.type === "blur") {
      newState = { ...newState, error: errorMsg, firstAttempt: false };
    }

    return newState;
  };

  const handleEmail = (event) => {
    setEmail(adaptState(email, event, testEmail));
  };

  const handlePassword = (event) => {
    setPassword(adaptState(password, event, testPassword));
  };

  const handleExistingPassword = (event) => {
    setPassword(adaptState(password, event, testPasswordExistence));
  };

  const handleDisplayName = (event) => {
    setDisplayName(adaptState(displayName, event, testDisplayName));
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
