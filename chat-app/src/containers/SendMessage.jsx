import React, { useContext, useState } from "react";
import MessageButton from "../components/MessageButton";
import MessageInput from "../components/MessageInput";
import "../styles.css";
import "../buttons.css";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import {
  arrayUnion,
  doc,
  updateDoc, getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const SendMessage = () => {
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  const handleSend = async () => {
    if(text != ""){
      try {
        const res = await getDoc(doc(db, "chats", data.chatsId));
        if (res.exists()) {
          console.log("exists", res)
        }
        else { console.log("doesnt exist") }
  
        await updateDoc(doc(db, "chats", data.chatsId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: userLogged.uid,
          }),
        });

        if(data.user2.uid == null){
          await updateDoc(doc(db, "userChats", userLogged.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            }
          });
    
          await updateDoc(doc(db, "userChats", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            }
          });
        } else if (data.user2.uid != null){
          await updateDoc(doc(db, "groupChat", userLogged.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            }
          });
    
          await updateDoc(doc(db, "groupChat", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            }
          });
          await updateDoc(doc(db, "groupChat", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            }
          });
        }


        // if(data.user2.uid != ""){
        //   await updateDoc(doc(db, "userChats", data.user2.uid), {
        //     [data.chatsId + ".lastMessage"]: {
        //       message: text,
        //     }
        //   });
        // }
      } catch (err) { console.log("error") }
      setText("");
    }
   
  };


  return (
    <div className="send-message-wrapper">
      <MessageInput type="text"
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        value={text}></MessageInput>
      <MessageButton onClick={handleSend}></MessageButton>
    </div>
  );
};

export default SendMessage;
