
const SingleThread = ({ onClick, receiver, message }) => {
	return (
	<div className='single-thread' onClick={onClick}>
        <p>{receiver}</p>
        <p>{message}</p>
    </div>
  );
}

SingleThread.defaultProps = {
	receiver: 'John S',
    message: 'Message goes here...'
};

export default SingleThread;