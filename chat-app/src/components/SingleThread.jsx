const SingleThread = ({
  onClick,
  receiver1,
  receiver2,
  message,
  className,
  groupName,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <p className="single-thread-header">
        <b>
          {" "}
          {groupName}{" "}
          {receiver2 == ""
            ? receiver1
            : " (" + receiver1 + ", " + receiver2 + ")"}
        </b>
      </p>
      <p className="single-thread-message">{message}</p>
    </div>
  );
};

SingleThread.defaultProps = {
  groupName: "",
  className: "single-thread",
  receiver1: "name1",
  receiver2: "name2",
  message: "Last message goes here...",
};

export default SingleThread;
