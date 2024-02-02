import "./UserInfo.css";

const UserInfo = ({
  onClick,
  value,
  displayName,
  uid,
  email,
  idx,
  className,
}) => {
  return (
    <li
      className={className}
      value={value}
      onClick={onClick}
      uid={uid}
      idx={idx}
    >
      <img
        className="chat-user-info-img"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div>
        <p className="user-info-name">
          <b>{displayName}</b>
        </p>
        <p className="user-info-email">{email}</p>
      </div>
    </li>
  );
};

export default UserInfo;
