const MessageButton = ({ onClick, text }) => {
	return (
	<button type="button" className="sendBtn" onClick={onClick}>
		{text}
    </button>
  );
}

MessageButton.defaultProps = {
	text: 'Send',
};

export default MessageButton;