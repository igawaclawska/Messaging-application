import React, { useContext } from "react";
import ChatBubble from "../components/ChatBubble";
import "./BubblesScrollable.css";
import { MessagesContext } from "../context/MessagesContext";

const BubblesScrollable = () => {
  const { messages } = useContext(MessagesContext);

  console.log(messages);
  return (
    <div className="bubbles-scrollable">
      {messages.map((message) => (
        <ChatBubble message={message} key={message.id} />
      ))}
    </div>
  );
};

export default BubblesScrollable;
