import useAuthInputField from "./useAuthInputField";
import {
  testEmail,
  testPassword,
  testPasswordExistence,
  testDisplayName,
} from "../utils/validation";

export const useAuthFormData = () => {
  const [email, emailError, handleEmail] = useAuthInputField("", testEmail);
  const [password, passwordError, handlePassword] = useAuthInputField(
    "",
    testPassword
  );
  const [existingPassword, existingPasswordError, handleExistingPassword] =
    useAuthInputField("", testPasswordExistence);
  const [displayName, displayNameError, handleDisplayName] = useAuthInputField(
    "",
    testDisplayName
  );

  return {
    email,
    emailError,
    handleEmail,
    password,
    passwordError,
    handlePassword,
    existingPassword,
    existingPasswordError,
    handleExistingPassword,
    displayName,
    displayNameError,
    handleDisplayName,
  };
};
