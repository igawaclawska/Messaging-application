import useAuthInputField from "./useAuthInputField";
import {
  testEmail,
  testPassword,
  testPasswordExistence,
  testDisplayName,
} from "../utils/validation";

export const useAuthFormData = () => {
  const [email, handleEmail] = useAuthInputField("", testEmail);
  const [password, handlePassword] = useAuthInputField("", testPassword);
  const [existingPassword, handleExistingPassword] = useAuthInputField(
    "",
    testPasswordExistence
  );
  const [displayName, handleDisplayName] = useAuthInputField(
    "",
    testDisplayName
  );

  return {
    email,
    handleEmail,
    password,
    handlePassword,
    existingPassword,
    handleExistingPassword,
    displayName,
    handleDisplayName,
  };
};
