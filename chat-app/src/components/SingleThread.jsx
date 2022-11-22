const SingleThread = ({ onClick, receiver, message, className }) => {
  return (
    <div className={className} onClick={onClick} >
      <p className="single-thread-header">
        <b>{receiver}</b>
      </p>
      <p className="single-thread-message">{message}</p>
    </div>
  );
};

SingleThread.defaultProps = {
  className: "single-thread",
  receiver: "John S",
  message: "Message goes here...",
};

export default SingleThread;
