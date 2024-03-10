import "./ThreadsHeader.css";
import { useState, useContext } from "react";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import Button from "../../components/button/Button";
import CreateChatModal from "../create-chat-modal/CreateChatModal";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const ThreadsHeader = () => {
  const [show, setShow] = useState(false);
  const { windowWidth } = useContext(WindowSizeContext);

  return (
    <header className="threads-header">
      <h2 className="thread-header-title">Chats</h2>
      <Button
        className="fixed-btn primary small with-icon"
        onClick={() => setShow(true)}
      >
        {windowWidth >= 800 && "New Chat"}
        <MapsUgcIcon />
      </Button>
      {show && <CreateChatModal show={setShow} setShow={setShow} />}
    </header>
  );
};

export default ThreadsHeader;
