import "./ChatHeader.css";
import React, { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import "../styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteChatModal from "./DeleteChatModal";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);
  let [isOpen, setIsOpen] = useState(false);

  let [user, setUser] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", data.user1?.uid || "")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data().photoURL);
          setUser(doc.data());
          console.log(`retrieved users header ${user}`);
        });
      });
      return () => {
        unsubscribe();
      };
    };
    getUsers();
  }, [data]);

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
            <img className="chat-user-img" src={user.photoURL || "blank-profile-picture.png"} alt="" />
            <span className="chat-header-title">{user.displayName}</span>
            <DeleteIcon className="delete-icon" onClick={handleOpenModal} />
          </>
        )}
      </div>
      {isOpen && <DeleteChatModal setIsOpen={setIsOpen} />}
    </header>
  );
};

export default ChatHeader;
