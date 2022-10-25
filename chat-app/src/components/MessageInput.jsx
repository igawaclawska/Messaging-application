const MessageInput = ({ className, id, label, placeholder, type, onChange }) => (
    <>
      <input
        type={type} className={"messageInput"} placeholder={"Type a message..."}
        onChange={onChange}
      />
    </>
  );
  
  
  export default MessageInput;