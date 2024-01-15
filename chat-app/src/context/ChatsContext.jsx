import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
  const { userLogged } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatsId: "null",
    user1: null,
    user2: null,
    user3: null,
    user4: null,
    user5: null,
    group: null,
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
      case "GROUP_CHAT":
        return {
          chatsId: action.payload6.name.replace(/\s/g, ""),
          user1: action.payload,
          user2: action.payload2,
          user3: action.payload3,
          user4: action.payload4,
          user5: action.payload5,
          group: action.payload6,
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
