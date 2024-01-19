import "./ChatHeader.css";
import React, { useContext } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import "../styles.css";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);

  return (
    <header className="chat-header">
      <div className="chat-header-wrapper">
        <div onClick={onClick} className="back-btn">
          <Button
            className="fixed-btn tertiary with-icon"
            text=""
            icon={<ArrowBackIosIcon />}
          ></Button>{" "}
        </div>
        <span className="chat-header-title">{data.user1?.displayName}</span>
      </div>
    </header>
  );
};

export default ChatHeader;
