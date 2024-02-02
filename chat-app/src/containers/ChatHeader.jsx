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

        {data.user1?.displayName && (
          <>
            <img
              className="chat-user-img"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <span className="chat-header-title">{data.user1?.displayName}</span>
            <DeleteIcon className="delete-icon" onClick={handleOpenModal} />
          </>
        )}
      </div>
      {isOpen && <DeleteChatModal setIsOpen={setIsOpen} />}
    </header>
  );
};

export default ChatHeader;
