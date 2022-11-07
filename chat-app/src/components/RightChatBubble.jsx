
const RightChatBubble = ({ onClick, text }) => {
	return (
	<div className="right-bubble-wrapper">
        <div className="right-bubble">
            <span className="messageSent"> {text}</span>
        </div>
    </div>
  );
}

RightChatBubble.defaultProps = {
	text: 'This is a message sent',
};

export default RightChatBubble;