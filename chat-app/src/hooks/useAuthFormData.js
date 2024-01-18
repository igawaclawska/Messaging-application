import { useState } from "react";

export const useAuthFormData = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameLowerCase, setDisplayNameLowerCase] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordRepeatedInput = (e) => {
    setPasswordRepeated(e.target.value);
  };

  const handleDisplayNameInput = (e) => {
    let name = e.target.value;
    setDisplayName(name);
    let nameLowercase = name.toLowerCase();
    setDisplayNameLowerCase(nameLowercase);
  };
  
  return {
    email,
    handleEmailInput,
    password,
    handlePasswordInput,
    displayName,
    handleDisplayNameInput,
    displayNameLowerCase,
    passwordRepeated,
    handlePasswordRepeatedInput,
  };
};
