import SingleThread from "../components/SingleThread";
import React, { useState } from "react";

const ThreadList = ({ onLoad, threadInput }) => {

    const [isActive, setIsActive] = useState(false);

    return (
        //create dynamic thread components 
        <div className="thread-list">
            {threadInput.map((thread, index) => (
                <SingleThread
                    onClick={() => setIsActive(thread)}
                    receiver={thread.author}
                    message={thread.message}
                    className={`single-thread ${isActive == thread && "active"}`}
                ></SingleThread>)
            )}
        </div>
    );
}

export default ThreadList;