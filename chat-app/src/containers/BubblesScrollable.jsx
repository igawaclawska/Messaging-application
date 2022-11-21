import React, { useContext, useEffect, useState } from "react";
import RightChatBubble from "../components/RightChatBubble";
import "../styles.css";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {ChatsContext} from "../context/ChatsContext"

const BubblesScrollable = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatsContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatsId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatsId]);

  console.log(messages)
  return (
    <div className="bubbles-scrollable">
        {messages.map((m) => (
        <RightChatBubble message={m} key={m.id} />
      ))}
      {/* <RightChatBubble></RightChatBubble> */}
      {/* <RightChatBubble text="This is a looooooooooooooooooooooooong message"></RightChatBubble>
      <RightChatBubble text="This is a letter: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></RightChatBubble>
      <LeftChatBubble></LeftChatBubble>
      <LeftChatBubble text="Nej"></LeftChatBubble>
      <LeftChatBubble text="This is another letter: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></LeftChatBubble> */}
    </div>
  );
};

export default BubblesScrollable;
