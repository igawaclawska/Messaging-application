import "./MessageModal.css";
import React, { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import {
  collection,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import UserInfo from "../components/UserInfo";

const MessageModal = ({ show }) => {
  const [usersSelected, setUserSelected] = useState();
  const [users, setUsers] = useState([]);
  // const [error, setError] = useState(false);
  const { userLogged } = useContext(AuthContext);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    const getUsers = () => {
      const querya = query(
        collection(db, "users"),
        where("uid", "!=", userLogged.uid)
      );
      const unsubscribe = onSnapshot(querya, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`retrieved users${JSON.stringify(users)}`);
          console.log(doc.id, "=>", doc.data());
          setUsers((prev) => [...prev, doc.data()]);
        });
      });
      return () => {
        unsubscribe();
      };
    };
    userLogged.uid && getUsers();
  }, [setUsers]);

  useEffect(() => {
    console.log("new state", usersSelected);
  }, [usersSelected]);

  const createChat = async () => {
    const chatsId =
      userLogged.uid > usersSelected.uid
        ? userLogged.uid + usersSelected.uid
        : usersSelected.uid + userLogged.uid;
    try {
      const res = await getDoc(doc(db, "chats", chatsId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatsId), { messages: [] });
        await updateDoc(doc(db, "userChats", userLogged.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: usersSelected.uid,
            displayName: usersSelected.displayName,
            email: usersSelected.email,
          },
          [chatsId + ".sender"]: {
            name: userLogged.displayName,
          },
        });
        await updateDoc(doc(db, "userChats", usersSelected.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: userLogged.uid,
            displayName: userLogged.displayName,
            email: userLogged.email,
          },
          [chatsId + ".sender"]: {
            name: usersSelected.displayName,
          },
        });
      }
    } catch (err) {}
    setUserSelected(null);
  };

  const handleChatCreation = async () => {
    await createChat();
    show(false);
  };
  const handleSelect = (user) => {
    setUserSelected(user);
    setIsActive(user);
    console.log(
      "search array after selection:" + JSON.stringify(usersSelected)
    );
  };

  return (
    <div onClick={() => show(false)} className="modal-div">
      <div
        onClick={(close) => close.stopPropagation()}
        className="create-message-wrapper"
      >
        <div className="create-message-header">
          <h3>Create a new chat</h3>
        </div>
        {/* The class 'create-message-body' seems to not extst */}
        <div className="create-message-body">
          <p> Select chat recipent from the list below.</p>
          <div className="add-receivers">
            <ul className="search-list">
              {/*TODO: Turn the list below into "radios" to improve accessibility */}
              {users.map((user, idx) => (
                <UserInfo
                  className={`user-info ${isActive === user && "active"}`}
                  onClick={() => handleSelect(user)}
                  key={idx}
                  displayName={user.displayName}
                  uid={user.uid}
                  value={user.username}
                  email={user.email}
                  idx={idx}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="create-message-footer">
          <Button
            className="fluid-btn secondary no-margin"
            onClick={() => show(false)}
            text="Cancel"
            icon=""
          ></Button>
          <Button
            className="fluid-btn primary no-margin"
            onClick={() => handleChatCreation()}
            text="Create chat"
            icon=""
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
