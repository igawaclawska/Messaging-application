import "./MessageInput.css";
import { useEffect, useRef } from "react";
import LottiePlayer from "../lottie-player/LottiePlayer";
import CancelIcon from '@mui/icons-material/Cancel';

const MessageInput = ({
  onKeyDown,
  value,
  type,
  onChange,
  endButtons,
  src,
  loading,
  onClick
}) => {
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
        {src && (
          <div className="img-div">
            {loading ? (
              <LottiePlayer
                src={"spinner-grey.json"}
                height={"24px"}
                width={"24px"}
                speed={0.7}
              />
            ) : (
              <>
              <CancelIcon onClick={onClick} fontSize="small" className="remove-img"/>
              <img className="image-to-be-sent" src={src}></img>
              </>
            )}
          </div>
        )}
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
