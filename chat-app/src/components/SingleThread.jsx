import "./SingleThread.css";

const SingleThread = ({ onClick, receiver1, message, className }) => {
  return (
    <li className={className} onClick={onClick}>
      <img
        className="single-thread-img"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="thread-text-content">
        <p className="single-thread-header">
          <b>{receiver1}</b>
        </p>
        <p className="single-thread-message">{message}</p>
      </div>
    </li>
  );
};

SingleThread.defaultProps = {
  groupName: "",
  className: "single-thread",
  receiver1: "name1",
  message: "Start conversation with this user...",
};

export default SingleThread;
