import "./ChatArea.css";
import { ChatsContext } from "../context/ChatsContext";
import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendMessage from "./SendMessage";
import Button from "../components/Button";
import LottiePlayer from "../components/LottiePlayer";

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
