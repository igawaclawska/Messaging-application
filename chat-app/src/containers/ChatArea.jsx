import "./ChatArea.css";
import { ChatsContext } from "../context/ChatsContext";
import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./chat-messages/ChatMessages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendMessage from "./SendMessage";
import Button from "../components/button/Button";
import LottiePlayer from "../components/lottie-player/LottiePlayer";

const ChatArea = ({ visibility }) => {
  const { data } = useContext(ChatsContext);

  return data.chatsId !== "null" ? (
    <div className="chat-area">
      <ChatHeader onClick={visibility} />
      <ChatMessages />
      <SendMessage />
    </div>
  ) : (
    <div className="chat-area-empty">
      {visibility && (
        <div onClick={visibility} className="back-btn-empty-chat">
          <Button
            className="fixed-btn tertiary with-icon"
            startIcon={<ArrowBackIosIcon />}
          ></Button>{" "}
        </div>
      )}
      <LottiePlayer
        src={"nothing-selected.json"}
        height={"300px"}
        width={"300px"}
        className={"player playerLt"}
        speed={0.7}
      />
      <p className="nothing-selected-text">No chat selected</p>
    </div>
  );
};

export default ChatArea;
