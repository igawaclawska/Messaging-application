import SingleThread from "../components/SingleThread";
import React, { useState, useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../firebase";


const ThreadList = ({ threadInput, visibility }) => {
  const [isActive, setIsActive] = useState(null);
  const [chats, setChats] = useState([]);

  const {userLogged} = useContext(AuthContext);

  // const {dispatch} = useContext(ChatsContext);

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

  // dispatch breaks everything, must figure out why

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

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

      {/* {threadInput.map((thread) => (
        <SingleThread
          key={thread.id}
          onClick={() => {
            setIsActive(thread);
            visibility();
          }}
          receiver={thread.author}
          message={thread.message}
          className={`single-thread ${isActive === thread && "active"}`}
        ></SingleThread>
      ))} */}
