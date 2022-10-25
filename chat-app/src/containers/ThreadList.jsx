import SingleThread from "../components/SingleThread";

const ThreadList = ({ onLoad }) => {
    return (
        <div className="thread-list">
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
                <SingleThread></SingleThread>
        </div>
    );
}

export default ThreadList;