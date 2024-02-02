import './SingleThread.css'

const SingleThread = ({
  onClick,
  receiver1,
  message,
  className,
}) => {
  return (
    <li className={className} onClick={onClick}>
      <p className="single-thread-header">
        <b>
          {receiver1 }
        </b>
      </p>
      <p className="single-thread-message">{message}</p>
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
