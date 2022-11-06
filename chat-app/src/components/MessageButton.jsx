import SendIcon from '@mui/icons-material/Send';

const MessageButton = ({ onClick }) => {
	return (
		<button type="button" className="sendBtn" onClick={onClick}>
			<SendIcon />  </button>
	);
}



export default MessageButton;