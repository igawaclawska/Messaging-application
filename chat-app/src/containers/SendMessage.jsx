import React from "react";
import MessageButton from "../components/MessageButton";
import MessageInput from "../components/MessageInput";
import "../styles.css";
import "../buttons.css";

const SendMessage = ({ onLoad }) => {
  return (
    <div className="send-message-wrapper">
      <MessageInput></MessageInput>
      <MessageButton></MessageButton>
    </div>
  );
};

export default SendMessage;
