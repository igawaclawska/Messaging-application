import "./ChatArea.css";
import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import SendMessage from "./SendMessage";
import { ChatsContext } from "../context/ChatsContext";
import { useContext } from "react";

const ChatArea = ({ visibility }) => {
  const { data } = useContext(ChatsContext);

  return data.chatsId !== "null" ? (
    <div className="chat-area">
      <ChatHeader onClick={visibility} />
      <BubblesScrollable />
      <SendMessage />
    </div>
  ) : (
    <div className="chat-area-empty">
      <p className="nothing-selected-text">No chat selected</p>
    </div>
  );
};

export default ChatArea;
