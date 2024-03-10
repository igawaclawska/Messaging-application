import "./ThreadsHeader.css";
import { useState, useContext } from "react";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import Button from "../../components/button/Button";
import MessageModal from "../create-chat-modal/CreateChatModal";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const ThreadsHeader = () => {
  const [show, setShow] = useState(false);
  const { windowWidth } = useContext(WindowSizeContext);

  return (
    <header className="threads-header">
      <span className="thread-header-title">Chats</span>
      <Button
        className="fixed-btn primary small with-icon"
        onClick={() => setShow(true)}
      >
        {windowWidth >= 800 && "New Chat"}
        <MapsUgcIcon />
      </Button>
      {show && <MessageModal show={setShow} setShow={setShow} />}
    </header>
  );
};

export default ThreadsHeader;
