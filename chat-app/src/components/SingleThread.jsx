const SingleThread = ({ onClick, receiver1, receiver2, message, className }) => {
  return (
    <div className={className} onClick={onClick} >
      <p className="single-thread-header">
        <b> {receiver2 == "" ? receiver1 : receiver1 + ", " + receiver1}</b>
      </p>
      <p className="single-thread-message">{message}</p>
    </div>
  );
};

SingleThread.defaultProps = {
  className: "single-thread",
  receiver1: "name1",
  receiver2: "name2",
  message: "Last message goes here...",
};

export default SingleThread;
