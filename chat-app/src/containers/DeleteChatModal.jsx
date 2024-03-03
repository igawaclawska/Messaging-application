import "./DeleteChatModal.css";
import { useContext } from "react";
import { ChatsContext } from "../context/ChatsContext";
import { useDeleteChat } from "../hooks/useDeleteChat";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";

const DeleteChatModal = ({ setIsOpen }) => {
  const { data } = useContext(ChatsContext);
  const { handleDeleteChat, loading } = useDeleteChat();

  const handleChatDeletion = async () => {
    try {
      await handleDeleteChat();
    } catch (err) {
      console.error(err);
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
          loading={loading}
        >
          Delete chat
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteChatModal;
