import "./BubblesScrollable.css";
import { useContext } from "react";
import ChatBubble from "../components/ChatBubble";

import { MessagesContext } from "../context/MessagesContext";

const BubblesScrollable = () => {
  const { messages } = useContext(MessagesContext);

  console.log(messages);
  return (
    <div className="bubbles-scrollable">
      {messages &&
        messages?.map((message) => (
          <ChatBubble message={message} key={message.id} />
        ))}
    </div>
  );
};

export default BubblesScrollable;
