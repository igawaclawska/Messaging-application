import { useState } from "react";

export const useAuthFormData = () => {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [displayNameErrorMsg, setDisplayNameErrorMsg] = useState("");

  const [displayNameLowerCase, setDisplayNameLowerCase] = useState("");

  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [passwordRepeatedErrorMsg, setPasswordRepeatedErrorMsg] = useState("")

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
