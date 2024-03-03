import { useContext, useState } from "react";
import { ChatsContext } from "../context/ChatsContext";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useDeleteChat = () => {
  const { data, dispatch } = useContext(ChatsContext);
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteChat = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "userChats", userLogged.uid), {
        [data.chatsId]: deleteField(),
      });

      await updateDoc(doc(db, "userChats", data.user1.uid), {
        [data.chatsId]: deleteField(),
      });

      await deleteDoc(doc(db, "chats", data.chatsId));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: "LOGOUT" });
      setMessages(null);
      setLoading(false);
    }
  };

  return { handleDeleteChat, loading };
};
