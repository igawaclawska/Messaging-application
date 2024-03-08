import "./ThreadsBar.css";
import ThreadsHeader from "../threads-header/ThreadsHeader";
import ThreadsList from "../threads-list/ThreadsList";

const ThreadsBar = ({ visibility }) => {
  return (
    <div className="threads-bar">
      <ThreadsHeader />
      <ThreadsList visibility={visibility} />
    </div>
  );
};

export default ThreadsBar;
