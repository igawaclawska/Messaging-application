import './MessageButton.css'
import SendIcon from "@mui/icons-material/Send";

const MessageButton = ({ onClick, icon, snapshot, children }) => {
  return (
    <button ref={snapshot} type="button" className="send-btn" onClick={onClick}>
      {children}
     {icon ? icon : <SendIcon />}
    </button>
  );
};

export default MessageButton;
