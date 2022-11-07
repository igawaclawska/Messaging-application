import SingleThread from "../components/SingleThread";
import React, { useState } from "react";

const ThreadList = (props) => {

    const [isActive, setIsActive] = useState(false);

    return (
        //create dynamic thread components 
        <div className="thread-list">
            {props.threadInput.map((thread, index) => (
                <SingleThread
                    key={thread.id}
                    toggleVisibiity={props.visibility}
                    onClick={() => {setIsActive(thread); props.visibility()}}
                    receiver={thread.author}
                    message={thread.message}
                    className={`single-thread ${isActive === thread && "active"}`}
                ></SingleThread>)
            )}
        </div>
    );
}

export default ThreadList;