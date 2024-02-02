import "./DeleteChatModal.css";
import React, { useContext } from "react";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";
import { ChatsContext } from "../context/ChatsContext";
import { AuthContext } from "../context/AuthContext";
import "firebase/firestore";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const UpdateProfilePictureModal = ({ setIsOpen }) => {
  const { data } = useContext(ChatsContext);
  const { userLogged } = useContext(AuthContext);


  const addImage = async () => {
    try {
        await updateDoc(doc(db, "users", userLogged.uid), {
            profileImg: "none",
        });
      }
     catch (err) {}
  };

  const removeImage = async () => {
    try {
        await updateDoc(doc(db, "users", userLogged.uid), {
            profileImg: deleteField(),
        });
      }
     catch (err) {}
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="delete-chat-header">
        <h3>{`Update your profile picture`} </h3>
      </div>
      <form>
        <input type="file" id="myFile" name="filename" />
        <div className="delete-chat-footer">
          <Button
            className="fluid-btn secondary no-margin"
            onClick={() => setIsOpen(false)}
            text="Cancel"
            icon=""
          ></Button>
          <Button
            className="fluid-btn primary no-margin"
            text="Update image"
            icon=""
            onClick={removeImage}
          ></Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
