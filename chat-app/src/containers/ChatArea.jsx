import "./ChatArea.css";
import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendMessage from "./SendMessage";
import Button from "../components/Button";
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
      {visibility && (
        <div onClick={visibility} className="back-btn-empty-chat">
          <Button
            className="fixed-btn tertiary with-icon"
            startIcon={<ArrowBackIosIcon />}
          ></Button>{" "}
        </div>
      )}
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
