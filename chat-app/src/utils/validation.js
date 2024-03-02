const isValue = (value) => {
  return value.trim() !== "";
};

const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const testEmail = (email) => {
  if (!isValue(email)) {
    return "Email is required";
  } else if (!isEmailValid(email)) {
    return "Invalid format";
  } else return "";
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

const testDisplayName = (userName) => {
  if (!isValue(userName)) {
    return "Name is required";
  } else return "";
};

export {
  isValue,
  isEmailValid,
  testEmail,
  isPasswordValid,
  testPassword,
  testPasswordExistence,
  testDisplayName,
};
