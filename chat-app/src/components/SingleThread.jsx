import { useState } from 'react';



const SingleThread = ({ onClick, receiver, message }) => {
  const [isActive, setIsActive] = useState(false);

const handleClick = () => {
  setIsActive(current => !current);
};
  return (
    <div className='single-thread' style={{
      backgroundColor: isActive ? '#F3F3F3' : '',
      color: isActive ? 'white' : '',
    }}
      onClick={handleClick}>
      <p><b>{receiver}</b></p>
      <p>{message}</p>
    </div>
  );
}

SingleThread.defaultProps = {
  receiver: 'John S',
  message: 'Message goes here...'
};

export default SingleThread;