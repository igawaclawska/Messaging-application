import "./ThreadList.css";
import SingleThread from "../components/SingleThread";
import React, { useState, useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../firebase";

const ThreadList = ({ visibility }) => {
  const [isActive, setIsActive] = useState(null);
  const [chats, setChats] = useState([]);

  const { userLogged } = useContext(AuthContext);
  const { dispatch } = useContext(ChatsContext);

  useEffect(() => {
    console.log(`chats object: ${Object.entries(chats).length}`);
  }, [chats]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", userLogged.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    userLogged.uid && getChats();
  }, [userLogged.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "INDIVIDUAL_CHAT", payload: u });
  };

  //create dynamic thread components
  const renderListOfChats = () => {
    return (
      <ul className="thread-list">
        {Object?.entries(chats)
          ?.sort((a, b) => b[1].date?.date - a[1].date?.date)
          ?.map((chat) => (
            <SingleThread
              key={chat[0]}
              className={`single-thread ${isActive === chat[1] && "active"}`}
              receiver1={chat[1].messageReceiver.displayName}
              receiver2={""}
              message={chat[1]?.lastMessage?.message}
              onClick={() => {
                handleSelect(chat[1].messageReceiver);
                setIsActive(chat[1]);
                visibility && visibility();
              }}
            ></SingleThread>
          ))}
      </ul>
    );
  };

  const renderEmptyChatsMessage = () => {
    return (
      <div className="thread-list">
        <div className="empty-chat-message">
          <h4 className="empty-chat-message-header">No chats yet!</h4>
          <p className="empty-chat-message-text">
            To start chatting with someone <br></br>click on the{" "}
            <b>"New Chat"</b> button
          </p>
        </div>
      </div>
    );
  };

  return Object?.entries(chats)?.length !== 0
    ? renderListOfChats()
    : renderEmptyChatsMessage();
};

export default ThreadList;
