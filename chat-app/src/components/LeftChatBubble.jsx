const LeftChatBubble = ({ onClick, text }) => {
	return (
	<div className="left-bubble-wrapper">
        <div className="left-bubble">
            <span className="messageSent"> {text}</span>
        </div>
    </div>
  );
}

LeftChatBubble.defaultProps = {
	text: 'This is a message received',
};

export default LeftChatBubble;