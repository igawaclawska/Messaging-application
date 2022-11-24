import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, doc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore";
import "../styles.css";
import "../buttons.css";
import UserInfo from "../components/UserInfo"
import MailTag from "../components/MailTag"


const MessageModal = ({ show }) => {
  const [foundUser, userFound] = useState(false);
  const [username, setUsername] = useState("");
  const [usersSelected, setUserSelected] = useState([]);
  const [user, setUser] = useState({})
  const [err, setErr] = useState(false);
  const [searchReslts, setSearchResults] = useState([]);
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
        searchReslts.push(doc.data());
        setSearchResults(searchReslts);
      });
    } catch (err) {
      setErr(true);
    } finally {
      if (searchReslts.length > 0) {
        userFound(true);
      } else {
        userFound(false);
      }
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  // console.log("selected array:" + JSON.stringify(usersSelected) + "length: " + (usersSelected.length));
  const createChat = async () => {
      const chatsId = userLogged.uid > usersSelected[0].uid ? userLogged.uid + usersSelected[0].uid : usersSelected[0].uid + userLogged.uid
      try {
        const res = await getDoc(doc(db, "chats", chatsId));
        if (!res.exists()) {
          await setDoc(doc(db, "chats", chatsId), { messages: [] });
          await updateDoc(doc(db, "userChats", userLogged.uid), {
            [chatsId + ".messageReceiver"]: {
              uid: usersSelected[0].uid,
              displayName: usersSelected[0].displayName,
              email: usersSelected[0].email,
            },
            [chatsId + ".sender"]: {
              name: userLogged.displayName,
            }
          });
          await updateDoc(doc(db, "userChats", usersSelected[0].uid), {
            [chatsId + ".messageReceiver"]: {
              uid: userLogged.uid,
              displayName: userLogged.displayName,
              email: userLogged.email,
            },
            [chatsId + ".sender"]: {
              name: usersSelected[0].displayName,
            }
          });
        }
      } catch (err) { }
      setUserSelected(null);
      setUsername("")
      userFound(false);
    
  };

  const createGroup = async () => {
      const chatsId = userLogged.uid > usersSelected[0].uid ? userLogged.uid + usersSelected[0].uid + usersSelected[1].uid : usersSelected[1].uid + usersSelected[0].uid + userLogged.uid
      try {
        // const group = await setDoc(doc(db, "groupChat", res.userLogged.uid), {});
        const res = await getDoc(doc(db, "chats", chatsId));
        if (!res.exists()) {
          await setDoc(doc(db, "chats", chatsId), { messages: [] });
          await updateDoc(doc(db, "groupChat", userLogged.uid), {
            [chatsId + ".messageReceiver1"]: {
              uid: usersSelected[0].uid,
              displayName: usersSelected[0].displayName,
              email: usersSelected[0].email,
            },
            [chatsId + ".messageReceiver2"]: {
              uid: usersSelected[1].uid,
              displayName: usersSelected[1].displayName,
              email: usersSelected[1].email,
            },
            [chatsId + ".sender"]: {
              name: userLogged.displayName,
            }
          });
          await updateDoc(doc(db, "groupChat", usersSelected[0].uid), {
            [chatsId + ".messageReceiver1"]: {
              uid: userLogged.uid,
              displayName: userLogged.displayName,
              email: userLogged.email,
            },
            [chatsId + ".messageReceiver2"]: {
              uid: usersSelected[1].uid,
              displayName: usersSelected[1].displayName,
              email: usersSelected[1].email,
            },
            [chatsId + ".sender"]: {
              name: usersSelected[0].displayName,
            }
          });
          await updateDoc(doc(db, "groupChat", usersSelected[1].uid), {
            [chatsId + ".messageReceiver1"]: {
              uid: userLogged.uid,
              displayName: userLogged.displayName,
              email: userLogged.email,
            },
            [chatsId + ".messageReceiver2"]: {
              uid: usersSelected[0].uid,
              displayName: usersSelected[0].displayName,
              email: usersSelected[0].email,
            },
            [chatsId + ".sender"]: {
              name: usersSelected[1].displayName,
            }
          });
        }
      } catch (err) { }
      setUserSelected(null);
      setUsername("")
      userFound(false);
    
  };

  const handleChatCreation = () => {
      if ((usersSelected.length - 1) == 1){ //if there are 2 recievers
         createGroup();
      } else if ((usersSelected.length -1) == 0){ //if there's just 1
         createChat();
    }
  }
  const handleSelect = (u) => {
    setUser(u);
    if (!usersSelected.includes(u)) {
      usersSelected.push(u);
    } 
    setUserSelected(usersSelected);
  };

  return (
    <div onClick={() => show(false)} className="modal-div">
      <div
        onClick={(close) => close.stopPropagation()}
        className="create-message-wrapper"
      >
        <div className="create-message-header">
          <h2>Create new chat</h2>
        </div>
        <div className="create-message-body">
          <h3> Receivers:</h3>
          <div className="add-receivers">
            <InputField placeholder="Receiver's ITU e-mail" onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)} value={username}>
            </InputField>
            <div>
                {(usersSelected != null) ? (
                  <span>
              {usersSelected.map((u) => <MailTag text={u.email} onClick={() => searchReslts.pop()}></MailTag>)}
                  </span>
              ) : (<span></span>)}
            </div>
          
            <div className="list-of-users">
              {foundUser ? (
                <ul>
                  {searchReslts.map((u, idx) => <UserInfo onClick={() => handleSelect(u)} key={u.uid} displayName={u.displayName} uid={u.uid} value={user} email={u.email} idx={idx} />)}
                </ul>
              ) : (<span></span>)}
            </div>
          </div>
        </div>
        {/* <div className="add-btn">
              <Button
                className="fluid-btn secondary"
                icon=""
                text="+ Add receivers"
              ></Button>
            </div> */}
        <div className="create-message-footer">
          <Button
            className="fluid-btn tertiary"
            onClick={() => show(false)}
            text="Cancel"
            icon=""
          ></Button>
          <Button
            className="fluid-btn primary"
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
