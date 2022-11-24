const SingleThread = ({ onClick, receiver, receiver2, receiver3, message, className }) => {
  return (
    <div className={className} onClick={onClick} >
      <p className="single-thread-header">
        <b> {receiver}  {receiver2}  {receiver3}</b>
      </p>
      <p className="single-thread-message">{message}</p>
    </div>
  );
};

SingleThread.defaultProps = {
  className: "single-thread",
  receiver: "name1",
  receiver2: "name2",
  receiver3: "name3",
  message: "Message goes here...",
};

export default SingleThread;
