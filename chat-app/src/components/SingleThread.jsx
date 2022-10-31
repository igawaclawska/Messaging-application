import { useState } from 'react';

const SingleThread = ({ onClick, receiver, message, className }) => {
  
  return (
    <div className={className}  onClick={onClick}>
  
        <p><b>{receiver}</b></p>
        <p>{message}</p>

    </div>
  );
}

SingleThread.defaultProps = {
  className: 'single-thread',
  receiver: 'John S',
  message: 'Message goes here...'
};

export default SingleThread;