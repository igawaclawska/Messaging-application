import "./SendMessage.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatsContext } from "../../context/ChatsContext";
import { arrayUnion, updateDoc, Timestamp, doc } from "firebase/firestore";
import {
  getStorage,
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
      const storageRef = ref(
        storage,
        `ImageSentViaChat-by-${userLogged.displayName}-${uuid()}`
      );
      if (file) {
        try {
          setLoading(true);
          await uploadBytesResumable(storageRef, file);
          const url = await getDownloadURL(storageRef);
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        setLoading(false);
      }
    };
    uploadFile();
  }, [file]);

  const handleKey = async (e) => {
    if (text.trim() !== "" && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(file);
  };

  const resetImage = async () => {
    const storage = getStorage();
    const desertRef = ref(storage, downloadUrl);
    deleteObject(desertRef)
      .then(() => {
        console.log("file deleted");
      })
      .catch((error) => {
        console.error(error);
      });

    setDownloadUrl(null);
    setFile(null);
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
        onClick={resetImage}
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
              accept="image/png, image/gif, image/jpeg"
              id="image-upload"
              name="filename"
              //reason for the onclick below https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file
              onClick={(e) => {
                e.target.value = "";
              }}
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
