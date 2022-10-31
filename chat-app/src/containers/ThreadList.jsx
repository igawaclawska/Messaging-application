import SingleThread from "../components/SingleThread";

const ThreadList = ({ onLoad, singleThread }) => {
    return (
        <div className="thread-list">
                <SingleThread className='single-thread-new-message'></SingleThread>
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