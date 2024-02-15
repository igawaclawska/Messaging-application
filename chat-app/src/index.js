import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContextProvider } from "./context/ChatsContext";
import { MessagesContextProvider } from "./context/MessagesContext";
import { WindowSizeContextProvider } from "./context/WindowSizeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <WindowSizeContextProvider>
      <ChatsContextProvider>
        <MessagesContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </MessagesContextProvider>
      </ChatsContextProvider>
    </WindowSizeContextProvider>
  </AuthContextProvider>
);
