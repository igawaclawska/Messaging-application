import './ThreadHeader.css'
import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import MessageModal from "./MessageModal";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

const ThreadHeader = ({ onLoad }) => {
  const [show, setShow] = useState(false);

  return (
    // Class 'thread-header' seems to not exist
    <header className="thread-header">
      <div className="thread-header-wrapper">
        <span className="thread-header-title">Chats</span>
        <Button
          className="fixed-btn primary small with-icon"
          text="New Chat"
          icon={<MapsUgcIcon />}
          onClick={() => setShow(true)}
        ></Button>
      </div>
      {show && <MessageModal show={setShow} />}
    </header>
  );
};

export default ThreadHeader;
