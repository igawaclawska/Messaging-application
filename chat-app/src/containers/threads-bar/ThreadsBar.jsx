import "./ThreadsBar.css";
import ThreadsHeader from "../threads-header/ThreadsHeader";
import ThreadsList from "../threads-list/ThreadsList";

const ThreadsBar = ({ visibility }) => {
  return (
    <section className="threads-bar">
      <ThreadsHeader />
      <ThreadsList visibility={visibility} />
    </section>
  );
};

export default ThreadsBar;
