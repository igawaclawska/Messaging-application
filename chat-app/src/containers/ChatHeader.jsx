import "./ChatHeader.css";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import "../styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteChatModal from "./DeleteChatModal";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);
  let [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

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
          {data.user1?.displayName && (
            <DeleteIcon className="delete-icon" onClick={handleOpenModal} />
          )}
        </div>
        {isOpen && <DeleteChatModal setIsOpen={setIsOpen}/>}
      </header>
  );
};

export default ChatHeader;
