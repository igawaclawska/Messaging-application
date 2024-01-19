import "./UserInfo.css";

const UserInfo = ({ onClick, value, displayName, uid, email, idx, className }) => {
  return (
    <div
      className={className}
      value={value}
      onClick={onClick}
      uid={uid}
      idx={idx}
    >
      <p className="user-info-name">
        <b>{displayName}</b>
      </p>
      <p className="user-info-email">{email}</p>
    </div>
  );
};

export default UserInfo;
