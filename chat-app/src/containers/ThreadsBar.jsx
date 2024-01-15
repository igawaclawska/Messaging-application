import './ThreadsBar.css'
import ThreadHeader from "./ThreadHeader";
import ThreadList from "./ThreadList";

const ThreadsBar = ({ onLoad, visibility }) => {
  return (
    <div className="threads-bar">
      <ThreadHeader></ThreadHeader>
      <ThreadList visibility={visibility}></ThreadList>
    </div>
  );
};

export default ThreadsBar;
