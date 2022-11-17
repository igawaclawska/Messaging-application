import React, {useState} from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { db } from "../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
import "../styles.css";
import "../buttons.css";

const MessageModal = ({ show }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
      // todo: check for names toLoweCase
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
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
            <b>receivers:</b>
          </h3>
          <div className="add-receivers">
            <InputField placeholder="Receiver's ITU e-mail" onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)} value={username}></InputField>
            {user && ( <span>{[user.displayName, ': ' , user.email]} </span>)}
            <div className="add-btn">
              <Button
                className="fluid-btn secondary"
                icon=""
                text="+ Add receivers"
              ></Button>
            </div>
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
            onClick={() => show(false)}
            text="Create chat"
            icon=""
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
