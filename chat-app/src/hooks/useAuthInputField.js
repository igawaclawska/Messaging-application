import { useState } from "react";

const useAuthInputField = (initialValue, validationFunction) => {
  const [state, setState] = useState({
    value: initialValue,
    error: "",
    firstAttempt: true,
  });

  const handleState = (event) => {
    let newState = adaptState(state, event, validationFunction);
    setState(newState);
  };

  const adaptState = (state, event, validationFunction) => {
    const input = event.target.value;
    let newState = { ...state, value: input };

    let errorMsg = validationFunction(input);

    if (state.firstAttempt !== true) {
      newState = { ...newState, error: errorMsg };
    }
    if (event.type === "blur") {
      newState = { ...newState, error: errorMsg, firstAttempt: false };
    }

    return newState;
  };

  return [state, handleState];
};

export default useAuthInputField;
