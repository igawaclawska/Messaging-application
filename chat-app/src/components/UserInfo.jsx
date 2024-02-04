import "./UserInfo.css";

const UserInfo = ({
  onClick,
  value,
  displayName,
  uid,
  email,
  idx,
  className,
  photo,
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
        src={photo || "blank-profile-picture.png"}
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
