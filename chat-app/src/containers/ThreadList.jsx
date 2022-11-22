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
    dispatch({ type: "ANOTHER_USER", payload: u });
    console.log(u);
  };


  return (
    //create dynamic thread components
    <div className="thread-list">
      {Object.entries(chats)?.map((chat) => (
          <SingleThread
            onClick={() => {
              setIsActive(chat[1]);
              handleSelect(chat[1].messageReceiver);
              visibility();
            }}
            key={chat[0]}
            className={`single-thread ${isActive === chat && "active"}`}
            receiver={chat[1].messageReceiver.displayName}
            message={chat[1]?.lastMessage?.message}
          >
          </SingleThread>
      ))}

    </div>
  );
};

export default ThreadList;
