import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContextProvider } from "./context/ChatsContext";
import { MessagesContextProvider } from "./context/MessagesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <MessagesContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MessagesContextProvider>
    </ChatsContextProvider>
  </AuthContextProvider>
);
