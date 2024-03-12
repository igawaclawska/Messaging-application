import "./SendMessage.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatsContext } from "../../context/ChatsContext";
import { arrayUnion, updateDoc, Timestamp, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import MessageButton from "../../components/message-button/MessageButton";
import MessageInput from "../../components/message-input/MessageInput";
import EmojiPickerDropdown from "../emoji-picker/EmojiPicker";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const SendMessage = () => {
  const [text, setText] = useState("");
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uploadFile = async () => {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userLogged.displayName + date}`);
      if (file) {
        try {
          // Upload file to storage
          setLoading(true);
          await uploadBytesResumable(storageRef, file);
          // Get download URL
          const url = await getDownloadURL(storageRef);
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        setLoading(false);
      }
    };
    uploadFile();
  }, [file, userLogged.displayName]);

  const handleKey = async (e) => {
    if (text.trim() !== "" && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const createMessageObject = (text, userLogged, img = null) => ({
    id: uuid(),
    text: text,
    senderId: userLogged.uid,
    senderName: userLogged.displayName,
    date: Timestamp.now(),
    img: img,
  });

  function generateUpdatedThreadContent(message, chatsId) {
    const updateData = {
      [chatsId + ".lastMessage"]: {
        message: message.text,
        img: message.img,
      },
      [chatsId + ".date"]: {
        date: message.date,
      },
    };
    return updateData;
  }

  const handleSend = async () => {
    let message = createMessageObject(text, userLogged, downloadUrl);

    if (text.trim() !== "" || downloadUrl !== null) {
      try {
        setText("");
        setDownloadUrl(null);
        await updateDoc(doc(db, "chats", data.chatsId), {
          messages: arrayUnion(message),
        });

        await updateDoc(
          doc(db, "userChats", userLogged.uid),
          generateUpdatedThreadContent(message, data.chatsId)
        );

        await updateDoc(
          doc(db, "userChats", data.user1.uid),
          generateUpdatedThreadContent(message, data.chatsId)
        );
        setText("");
        setDownloadUrl(null);
        setFile(null);
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
        src={downloadUrl}
        loading={loading}
        endButtons={
          <>
            <label for="image-upload">
              <AddPhotoAlternateIcon className="icon-button" />
            </label>
            <input
              className="uploadmsg"
              onChange={handleChange}
              type="file"
              id="image-upload"
              name="filename"
            />
            <EmojiPickerDropdown setText={setText} />
          </>
        }
      />

      <MessageButton onClick={handleSend} />
    </div>
  );
};

export default SendMessage;
