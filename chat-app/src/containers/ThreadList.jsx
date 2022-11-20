import SingleThread from "../components/SingleThread";
import React, { useState, useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";


const ThreadList = ({ visibility }) => {
  const [isActive, setIsActive] = useState(null);
  const [chats, setChats] = useState([]);

  const {userLogged} = useContext(AuthContext);

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

  console.log(chats);

  return (
    //create dynamic thread components
    <div className="thread-list">
      {Object.entries(chats)?.map((chat) => (
        <SingleThread
        onClick={() => {
          setIsActive(chat);
          visibility();
        }} 
          className={`single-thread ${isActive === chat && "active"}`}
          receiver={chat[1].messageReceiver.displayName
        }></SingleThread>
      ))}

    </div>
  );
};

export default ThreadList;
