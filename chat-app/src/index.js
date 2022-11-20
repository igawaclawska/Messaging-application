import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContext } from "./context/ChatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    {/* <ChatsContext> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </ChatsContext> */}
  </AuthContextProvider>
);