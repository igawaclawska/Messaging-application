import "./ChatBubble.css";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChatBubble = ({ senderId, text, img }) => {
  const { userLogged } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
      // alignToTop: false,
    });
  }, [text, img]);

  return (
    <div className={`message ${senderId === userLogged.uid}`}>
      <div
        className={`bubble-wrapper
          ${senderId === userLogged.uid ? "right" : "left"}
        `}
      >
        <div
          ref={ref}
          className={`bubble ${
            senderId === userLogged.uid ? "right" : "left"
          } `}
        >
          {img && <img alt="attached" className="sent-image" src={img}></img>}
          <div className="message-sent">{text}</div>
        </div>
      </div>{" "}
    </div>
  );
};

ChatBubble.defaultProps = {
  text: "This is a message sent",
};

export default ChatBubble;
