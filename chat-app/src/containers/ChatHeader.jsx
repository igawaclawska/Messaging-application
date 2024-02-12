import "./ChatHeader.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import "../styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteChatModal from "./DeleteChatModal";
import DropdownOptions from "../components/DropdownOptions";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);
  let [isOpen, setIsOpen] = useState(false);

  let [user, setUser] = useState({});

  const menuRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuOptions = [
    {
      id: 1,
      label: "Remove chat",
      onClick: handleOpenModal,
    },
  ];

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
              src={user.photoURL || "blank-profile-picture.png"}
              alt=""
            />
            <span className="chat-header-title">{user.displayName}</span>
            <div className="delete-icon" ref={menuRef}>
              <MoreVertIcon onClick={toggleMenu} />
              <DropdownOptions isOpen={isDropdownOpen} options={menuOptions} />
            </div>
          </>
        )}
      </div>
      {isOpen && <DeleteChatModal setIsOpen={setIsOpen} />}
    </header>
  );
};

export default ChatHeader;
