import "./SendMessage.css";
import { useContext, useState } from "react";
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
import MessageButton from "../components/message-button/MessageButton";
import MessageInput from "../components/message-input/MessageInput";
import EmojiPickerDropdown from "./emoji-picker/EmojiPicker";

const SendMessage = () => {
  const [text, setText] = useState("");
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const handleKey = async (e) => {
    if (text.trim() !== "" && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  const handleSend = async () => {
    if (text.trim() !== "") {
      try {
        setText("");
        await updateDoc(doc(db, "chats", data.chatsId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: userLogged.uid,
            senderName: userLogged.displayName,
            date: Timestamp.now(),
          }),
        });

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
        setText("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="send-message-wrapper">
      <MessageInput
        type="text"
        onKeyDown={handleKey}
        onChange={(event) => setText(event.target.value)}
        value={text}
        endButtons={<EmojiPickerDropdown setText={setText} />}
      />

      <MessageButton onClick={handleSend} />
    </div>
  );
};

export default SendMessage;
