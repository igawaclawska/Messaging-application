import "./ChatArea.css";
import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import SendMessage from "./SendMessage";
import { ChatsContext } from "../context/ChatsContext";
import { useContext } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

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
      <Player
        src="nothing-selected.json"
        className="player playerLt"
        loop
        autoplay
        style={{ height: "300px", width: "300px" }}
        speed={0.7}
      />
      <p className="nothing-selected-text">No chat selected</p>
    </div>
  );
};

export default ChatArea;
