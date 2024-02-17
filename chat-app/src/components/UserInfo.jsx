import "./UserInfo.css";
import ProfileImage from "./ProfileImage";

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
      <ProfileImage src={photo} className={"small-image"} />
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
