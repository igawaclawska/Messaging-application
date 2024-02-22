import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatsContext } from "../context/ChatsContext";

export const MessagesContext = createContext();

export const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const { data } = useContext(ChatsContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatsId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      console.log("messages rendered");
    });

    return () => {
      unSub();
    };
  }, [data.chatsId]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
