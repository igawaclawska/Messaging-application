import './MessageButton.css'
import SendIcon from "@mui/icons-material/Send";

const MessageButton = ({ onClick }) => {
  return (
    <button type="button" className="send-btn" onClick={onClick}>
      <SendIcon />{" "}
    </button>
  );
};

export default MessageButton;
