import "./ChatArea.css";
import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import SendMessage from "./SendMessage";

const ChatArea = ({ visibility }) => {
  return (
    <div className="chat-area">
      <ChatHeader onClick={visibility} />
      <BubblesScrollable />
      <SendMessage />
    </div>
  );
};

export default ChatArea;
