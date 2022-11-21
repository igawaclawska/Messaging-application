import React, { useContext, useEffect, useRef } from "react";
import { ChatsContext } from "../context/ChatsContext"
import { AuthContext } from "../context/AuthContext"

const RightChatBubble = ({ message, text }) => {
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);
  const ref = useRef();

  useEffect(() => {
    
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === userLogged.uid}`}
    >
      <div className="right-bubble-wrapper">
        <div className="right-bubble">
          <span className="messageSent">{message.text}</span>
        </div>
      </div> </div>
  );
};

RightChatBubble.defaultProps = {
  text: "This is a message sent",
};

export default RightChatBubble;
