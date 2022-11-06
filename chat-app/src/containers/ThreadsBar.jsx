import ThreadHeader from "./ThreadHeader";
import ThreadList from "./ThreadList";

const ThreadsBar = ({ onLoad, threadInput, visibility }) => {

    return (
        <sidebar visibility={visibility} className="threads-bar">
                    <ThreadHeader></ThreadHeader>
                    <ThreadList threadInput={threadInput} visibility={visibility}></ThreadList>
        </sidebar>
    );
}

export default ThreadsBar;