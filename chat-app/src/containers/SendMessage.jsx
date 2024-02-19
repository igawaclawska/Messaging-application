import "./SendMessage.css";
import React, { useContext, useState } from "react";
import MessageButton from "../components/MessageButton";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import MessageInput from "../components/MessageInput";
import EmojiPicker from "emoji-picker-react";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import {
  arrayUnion,
  updateDoc,
  serverTimestamp,
  Timestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const SendMessage = () => {
  const [text, setText] = useState("");
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);
  const [showPicker, setShowPicker] = useState(false);

  const handleKey = (e) => {
    if (text.trim() !== "" && e.keyCode === 13 && !e.shiftKey) {
      handleSend();
    }
  };
  const handleSend = async () => {
    if (text.trim() !== "") {
      try {
        await updateDoc(doc(db, "chats", data.chatsId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: userLogged.uid,
            senderName: userLogged.displayName,
            date: Timestamp.now(),
          }),
        });

        if (data.user2 == null) {
          await updateDoc(doc(db, "userChats", userLogged.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });

          await updateDoc(doc(db, "userChats", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
      setText("");
    }
  };

  const onEmojiClick = (event) => {
    setText((prevInput) => prevInput + " " + event.emoji + " ");
    setShowPicker(false);
  };

  return (
    <div className="send-message-wrapper">
      <MessageInput
        type="text"
        onKeyDown={handleKey}
        onChange={(event) => setText(event.target.value)}
        value={text}
      ></MessageInput>
      <MessageButton onClick={handleSend} />
      <MessageButton onClick={() => setShowPicker((val) => !val)} />
      {showPicker && (
        <EmojiPicker
          pickerStyle={{ width: "100%" }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </div>
  );
};

export default SendMessage;
