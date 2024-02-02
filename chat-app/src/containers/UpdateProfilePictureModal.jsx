import "./DeleteChatModal.css";
import React, { useContext } from "react";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";
import { ChatsContext } from "../context/ChatsContext";
import "firebase/firestore";

const UpdateProfilePictureModal = ({ setIsOpen }) => {
  const { data } = useContext(ChatsContext);

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
            type="submit"
            className="fluid-btn primary no-margin"
            text="Update image"
            icon=""
          ></Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
