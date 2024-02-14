import "./ThreadHeader.css";
import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import MessageModal from "./MessageModal";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const ThreadHeader = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="thread-header">
      <div className="thread-header-wrapper">
        <span className="thread-header-title">Chats</span>
        <Button
          className="fixed-btn primary small with-icon"
          endIcon={<MapsUgcIcon />}
          onClick={() => setShow(true)}
        >
          New Chat
        </Button>
      </div>
      {show && <MessageModal show={setShow} setShow={setShow} />}
    </header>
  );
};

export default ThreadHeader;
