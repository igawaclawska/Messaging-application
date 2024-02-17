import "./MessageInput.css";
import { useEffect, useRef } from "react";

const MessageInput = ({ onKeyDown, value, type, onChange }) => {
  const textAreaHeightRef = useRef(null);

  useEffect(() => {
    const adaptTextareaHeight = () => {
      if (textAreaHeightRef.current) {
        textAreaHeightRef.current.style.height = "auto";
        textAreaHeightRef.current.style.height = `${textAreaHeightRef.current.scrollHeight}px`;
      }
    };

    adaptTextareaHeight();
    window.addEventListener("resize", adaptTextareaHeight);
    return () => window.removeEventListener("resize", adaptTextareaHeight);
  }, [value]);

  return (
    <>
      <textarea
        ref={textAreaHeightRef}
        onKeyDown={onKeyDown}
        type={type}
        className={"messageInput"}
        placeholder={"Type a message..."}
        onChange={onChange}
        required={true}
        value={value}
        id="scalable-text"
      />
    </>
  );
};

export default MessageInput;
