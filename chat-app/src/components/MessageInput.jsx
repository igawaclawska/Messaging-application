const MessageInput = ({
  className,
  id,
  label,
  placeholder,
  value,
  type,
  onChange,
}) => (
  <>
    <input
      type={type}
      className={"messageInput"}
      placeholder={"Type a message..."}
      onChange={onChange}
      required={true}
      value={value}
    />
  </>
);

export default MessageInput;
