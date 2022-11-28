import SingleThread from "../components/SingleThread";
import React, { useState } from "react";

const ThreadList = ({ threadInput, visibility }) => {
  const [isActive, setIsActive] = useState(null);

  return (
    //create dynamic thread components
    <div className="thread-list">
      {threadInput.map((thread) => (
        <SingleThread
          key={thread.id}
          onClick={() => {
            setIsActive(thread);
            visibility();
          }}
          receiver={thread.author}
          message={thread.message}
          className={`single-thread ${isActive === thread && "active"}`}
        ></SingleThread>
      ))}
    </div>
  );
};

export default ThreadList;
