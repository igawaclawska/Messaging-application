import "./ThreadsBar.css";
import ThreadsHeader from "./threads-header/ThreadsHeader";
import ThreadList from "./ThreadList";

const ThreadsBar = ({ visibility }) => {
  return (
    <div className="threads-bar">
      <ThreadsHeader />
      <ThreadList visibility={visibility}></ThreadList>
    </div>
  );
};

export default ThreadsBar;
