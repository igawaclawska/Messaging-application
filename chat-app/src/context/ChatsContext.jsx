import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
  const { userLogged } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatsId: "null",
    user1: null,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "INDIVIDUAL_CHAT":
        return {
          user1: action.payload,
          chatsId:
            userLogged.uid > action.payload.uid
              ? userLogged.uid + action.payload.uid
              : action.payload.uid + userLogged.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
