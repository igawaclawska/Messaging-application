import "./DeleteChatModal.css";
import React, { useContext } from "react";
import Button from "../components/Button";
import { ChatsContext } from "../context/ChatsContext";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "firebase/firestore";

const DeleteChatModal = ({ setIsOpen }) => {
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
    setIsOpen(false);
  };

  return (
    <div onClick={() => setIsOpen(false)} className="modal-wrapper">
      <div
        onClick={(close) => close.stopPropagation()}
        className="create-message-wrapper"
      >
        <div className="create-chat-header">
          <h3>{`Delete chat with ${data.user1?.displayName}?`} </h3>
        </div>
        {/* The class 'create-message-body' seems to not extst */}
        <div className="create-message-body">
          <p className="instruction">
            {`Your chat with ${data.user1?.displayName} will be deleted along with all of its messages. This action can't be undone.`}
          </p>
        </div>
        <div className="footer">
          <Button
            className="fluid-btn secondary no-margin"
            onClick={() => setIsOpen(false)}
            text="Cancel"
            icon=""
          ></Button>
          <Button
            className="fluid-btn primary no-margin"
            onClick={handleDeleteChat}
            text="Delete chat"
            icon=""
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;
