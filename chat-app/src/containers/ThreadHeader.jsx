import "./ThreadHeader.css";
import { useState, useContext } from "react";
import { WindowSizeContext } from "../context/WindowSizeContext";
import Button from "../components/Button/Button";
import MessageModal from "./MessageModal";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const ThreadHeader = () => {
  const [show, setShow] = useState(false);
  const { windowWidth } = useContext(WindowSizeContext);

  return (
    <header className="thread-header">
      <div className="thread-header-wrapper">
        <span className="thread-header-title">Chats</span>
        <Button
          className="fixed-btn primary small with-icon"
          onClick={() => setShow(true)}
        >
          {windowWidth >= 800 && "New Chat"}
          <MapsUgcIcon />
        </Button>
      </div>
      {show && <MessageModal show={setShow} setShow={setShow} />}
    </header>
  );
};

export default ThreadHeader;
