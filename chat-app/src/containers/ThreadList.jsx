import SingleThread from "../components/SingleThread";

const ThreadList = ({ onLoad, threadslist }) => {

    return (
        //creates dynamic thread components
        <div className="thread-list">
            {threadslist.map((thread, index) => (
                <SingleThread receiver={thread.author} message={thread.message}></SingleThread>)
            )}
        </div>
    );
}

export default ThreadList;