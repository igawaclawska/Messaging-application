import "./MessageInput.css";
import { useEffect, useRef } from "react";

const MessageInput = ({ onKeyDown, value, type, onChange, endButtons, src }) => {
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
      <div className="text-area-wrapper">
       {src && <img className="image-to-be-sent" src={src}></img>} 
        <textarea
          rows={1}
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
        {endButtons}
      </div>
    </>
  );
};

export default MessageInput;
