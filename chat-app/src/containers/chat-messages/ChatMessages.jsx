import "./ChatMessages.css";
import { useContext } from "react";
import ChatBubble from "../../components/chat-bubble/ChatBubble";

import { MessagesContext } from "../../context/MessagesContext";

const ChatMessages = () => {
  const { messages } = useContext(MessagesContext);

  console.log(messages);
  return (
    <div className="bubbles-scrollable">
      {messages &&
        messages?.map((message) => (
          <ChatBubble { ...message } key={message.id} />
        ))}
    </div>
  );
};

export default ChatMessages;
