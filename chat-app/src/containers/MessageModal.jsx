import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, doc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore";
import "../styles.css";
import "../buttons.css";
import UserInfo from "../components/UserInfo"


const MessageModal = ({ show }) => {
  const [foundUser, userFound] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [users, setUserList] = useState([]);
  const { userLogged } = useContext(AuthContext);

  const handleSearch = async () => {
    const filter = query(
      collection(db, "users"),
      where("displayName", "==", username)
      // todo: check for names toLoweCase
    );

    try {
      const filteredDocs = await getDocs(filter);
      await filteredDocs.forEach((doc) => {
          users.push(doc.data());
          setUserList(users);
      });
      console.info(users);
   
    } catch (err) {
      setErr(true);
    } finally {
        if(users.length > 0){
          userFound(true);
          if (foundUser){
            console.log("yep")
          }
        } else {
          userFound(false);
          if (!foundUser){
            console.log("nope")
          }
        } 
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const createChat = async () => {
    const chatsId = userLogged.uid > user.uid ? userLogged.uid + user.uid : user.uid + userLogged.uid
    try {
      const res = await getDoc(doc(db, "chats", chatsId));

      if (!res.exists()) {

        await setDoc(doc(db, "chats", chatsId), { messages: [] });

        await updateDoc(doc(db, "userChats", userLogged.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          },
          [chatsId + ".sender"]: {
            name: userLogged.displayName,
          }
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: userLogged.uid,
            displayName: userLogged.displayName,
            email: userLogged.email,
          },
          [chatsId + ".sender"]: {
            name: user.displayName,
          }
        });
      }
    } catch (err) { }
    setUser(null);
    setUsername("")
    userFound(false);
  };    

  return (
    <div onClick={() => show(false)} className="modal-div">
      <div
        onClick={(close) => close.stopPropagation()}
        className="create-message-wrapper"
      >
        <div className="create-message-header">
          <h1>Create new chat</h1>
        </div>
        <div className="create-message-body">
          <h3>
            <b>Receivers:</b>
          </h3>
          <div className="add-receivers">
            <InputField placeholder="Receiver's ITU e-mail" onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)} value={username}>
            </InputField>
            <div className="list-of-users">
            {foundUser ? (
            <ul>
            {users.map((user, idx) => <UserInfo onClick={() => setUser(user)} value={user} key={user.uid} displayName={user.displayName} uid={user.uid} email={user.email} idx={idx}/>)}
            </ul>
              ) : ( <span>No users with name: {username} found</span>)}
            </div>
          </div>
        </div>
        <div className="add-btn">
              <Button
                className="fluid-btn secondary"
                icon=""
                text="+ Add receivers"
              ></Button>
            </div>
        <div className="create-message-footer">
          <Button
            className="fluid-btn tertiary"
            onClick={() => show(false)}
            text="Cancel"
            icon=""
          ></Button>
          <Button
            className="fluid-btn primary"
            onClick={createChat}
            text="Create chat"
            icon=""
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
