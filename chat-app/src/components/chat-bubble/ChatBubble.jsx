import "./ChatBubble.css";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChatBubble = ({ message }) => {
  const { userLogged } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      block: "start",
      inline: "center",
      behavior: "smooth",
      alignToTop: false,
    });
  }, [message]);

  return (
    <div className={`message ${message.senderId === userLogged.uid}`}>
      <div
        className={`bubble-wrapper
          ${message.senderId === userLogged.uid ? "right" : "left"}
        `}
      >
        <div
          ref={ref}
          className={`bubble ${
            message.senderId === userLogged.uid ? "right" : "left"
          } `}
        >
          {message.image ? (
            <img
              alt="attached"
              className="sent-image"
              src={message?.image}
            ></img>
          ) : (
            <img
              alt="attached"
              className="sent-image"
              src="blank-profile-picture.png"
            ></img>
          )}
          <div className="message-sent">{message.text}</div>
        </div>
      </div>{" "}
    </div>
  );
};

ChatBubble.defaultProps = {
  text: "This is a message sent",
};

export default ChatBubble;
