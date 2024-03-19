import "./UserInfo.css";
import ProfileImage from "../profile-image/ProfileImage";

const UserInfo = ({
  onClick,
  value,
  className,
  photoURL,
  email,
  displayName,
  uid,
}) => {
  return (
    <li className={className} value={value} onClick={onClick} uid={uid}>
      <ProfileImage src={photoURL} className={"small-image"} />
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
