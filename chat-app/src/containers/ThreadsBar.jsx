import ThreadHeader from "./ThreadHeader";
import ThreadList from "./ThreadList";

const ThreadsBar = ({ onLoad, threadInput, visibility }) => {
  return (
    <div className="threads-bar">
      <ThreadHeader></ThreadHeader>
      <ThreadList
        threadInput={threadInput}
        visibility={visibility}
      ></ThreadList>
    </div>
  );
};

export default ThreadsBar;
