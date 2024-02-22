import "./DeleteChatModal.css";
import React, { useContext } from "react";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";
import { ChatsContext } from "../context/ChatsContext";
import { useDeleteChat } from "../hooks/useDeleteChat";
import { Player } from "@lottiefiles/react-lottie-player";

const DeleteChatModal = ({ setIsOpen }) => {
  const { data } = useContext(ChatsContext);
  const { handleDeleteChat, loading } = useDeleteChat();

  const handleChatDeletion = async () => {
    try {
      await handleDeleteChat();
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="delete-chat-header">
        <h3>{`Delete chat with ${data.user1?.displayName}?`} </h3>
      </div>
      {/* The class 'create-message-body' seems to not extst */}
      <div className="create-message-body">
        <p className="delete-chat-instruction">
          {`Your chat with ${data.user1?.displayName} will be deleted along with all of its messages. This action can't be undone.`}
        </p>
      </div>
      <div className="delete-chat-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="fluid-btn primary no-margin"
          onClick={handleChatDeletion}
        >
          {loading ? (
            <Player
              src="spinner.json"
              className="player"
              loop
              autoplay
              style={{ height: "19px", width: "19px" }}
              speed={1.5}
            />
          ) : (
            "Delete chat"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteChatModal;
