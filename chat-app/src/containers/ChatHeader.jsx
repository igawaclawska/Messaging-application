import "./ChatHeader.css";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles.css";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatHeader = ({ onClick }) => {

  const { data, dispatch } = useContext(ChatsContext);
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext);

  const handleDeleteChat = async () => {
    try {
      await updateDoc(doc(db, "userChats", userLogged.uid), {
        [data.chatsId]: deleteField(),
      });

      await updateDoc(doc(db, "userChats", data.user1.uid), {
        [data.chatsId]: deleteField(),
      });

      await deleteDoc(doc(db, "chats", data.chatsId));
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: "LOGOUT" });
    setMessages(null);
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
        {data.user1?.displayName && <DeleteIcon className="delete-icon" onClick={handleDeleteChat} />}
      </div>
    </header>
  );
};

export default ChatHeader;
