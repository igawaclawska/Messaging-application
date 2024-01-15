import './MessageInput.css'

const MessageInput = ({
  className,
  id,
  label,
  placeholder,
  onKeyDown,
  value,
  type,
  onChange,
}) => (
  <>
    <input
      onKeyDown={onKeyDown}
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
