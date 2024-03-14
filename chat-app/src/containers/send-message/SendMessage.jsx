import "./SendMessage.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatsContext } from "../../context/ChatsContext";
import { arrayUnion, updateDoc, Timestamp, doc } from "firebase/firestore";
import { useUploadFiles } from "../../hooks/useUploadFile";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import MessageButton from "../../components/message-button/MessageButton";
import MessageInput from "../../components/message-input/MessageInput";
import EmojiPickerDropdown from "../emoji-picker/EmojiPicker";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const SendMessage = () => {
  const [text, setText] = useState("");
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const {
    loadingImg,
    downloadUrl,
    setDownloadUrl,
    setFile,
    cancelUpload,
    handleSelectFile,
  } = useUploadFiles(userLogged);

  const handleKey = async (e) => {
    if (text.trim() !== "" && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  const createMessageObject = (text, userLogged, imgUrl = null) => ({
    id: uuid(),
    text: text,
    senderId: userLogged.uid,
    senderName: userLogged.displayName,
    date: Timestamp.now(),
    img: imgUrl,
  });

  function generateUpdatedThreadContent(message, chatsId) {
    const updateData = {
      [chatsId + ".lastMessage"]: {
        message: message.text,
        img: message.imgUrl,
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
        onClick={cancelUpload}
        onChange={(event) => setText(event.target.value)}
        value={text}
        src={downloadUrl}
        loading={loadingImg}
        endButtons={
          <>
            <label for="image-upload">
              <AddPhotoAlternateIcon className="icon-button" />
            </label>
            <input
              className="uploadmsg"
              onChange={handleSelectFile}
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
