import "./MessageModal.css";
import React, { useContext, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import UserInfo from "../components/UserInfo";
import MailTag from "../components/MailTag";

const MessageModal = ({ show }) => {
  const [foundUser, userFound] = useState(false);
  const [username, setUsername] = useState("");
  const [usersSelected, setUserSelected] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { userLogged } = useContext(AuthContext);

  const handleSearch = async () => {
    if (username !== "") {
      let caseInsensitiveUsername = username.toLowerCase();
      const filter = query(
        collection(db, "users"),
        where("displayNameLowerCase", "==", caseInsensitiveUsername)
      );
      try {
        const filteredDocs = await getDocs(filter);
        filteredDocs.forEach((doc) => {
          searchResults.push(doc.data());
          setSearchResults(searchResults);
        });
      } catch (err) {
        setError(true);
        console.log(`error status: ${error}`);
      } finally {
        if (searchResults.length > 0) {
          userFound(true);
        } else {
          userFound(false);
        }
      }
      setUsername("");
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const createChat = async () => {
    const chatsId =
      userLogged.uid > usersSelected[0].uid
        ? userLogged.uid + usersSelected[0].uid
        : usersSelected[0].uid + userLogged.uid;
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
          },
        });
        await updateDoc(doc(db, "userChats", usersSelected[0].uid), {
          [chatsId + ".messageReceiver"]: {
            uid: userLogged.uid,
            displayName: userLogged.displayName,
            email: userLogged.email,
          },
          [chatsId + ".sender"]: {
            name: usersSelected[0].displayName,
          },
        });
      }
    } catch (err) {}
    setUserSelected(null);
    userFound(false);
  };

  const handleChatCreation = async () => {
    await createChat();
    show(false);
  };
  const handleSelect = (u, idx) => {
    setUser(u);
    if (!usersSelected.includes(u)) {
      searchResults.splice(idx, 1); // remove object from the search Array
      usersSelected.push(u); //adding the specific user from the searchResults to the usersSelected
    }
    setUserSelected(usersSelected);
    console.log(
      "search array after selection:" +
        JSON.stringify(searchResults) +
        "length: " +
        searchResults.length
    );
  };

  const handleSelect2 = (u, idx) => {
    setUser({});
    if (!searchResults.includes(u)) {
      usersSelected.splice(idx, 1); // remove object from the selectedUsers Array
    }
    console.log(
      "usersSelected array after selection:" +
        JSON.stringify(usersSelected) +
        "length: " +
        usersSelected.length
    );
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
        {/* The class 'create-message-body' seems to not extst */}
        <div className="create-message-body">
          <h3> Receivers:</h3>
          <div className="add-receivers">
            {/* The class 'add-input' seems to not extst */}
            <InputField
              className="add-input"
              placeholder="Receiver's name"
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></InputField>
            {usersSelected != null ? (
              <span className="users-selected">
                {usersSelected.map((u, idx) => (
                  <MailTag
                    text={u.email}
                    onClick={() => handleSelect2(u, idx)}
                  ></MailTag>
                ))}
              </span>
            ) : null}
            {foundUser ? (
              <ul className="search-list">
                {searchResults.map((u, idx) => (
                  <UserInfo
                    onClick={() => handleSelect(u, idx)}
                    key={u.uid}
                    displayName={u.displayName}
                    uid={u.uid}
                    value={username}
                    email={u.email}
                    idx={idx}
                  />
                ))}
              </ul>
            ) : null}
          </div>
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
