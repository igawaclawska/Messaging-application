import "./UserInfo.css";
import ProfileImage from "../profile-image/ProfileImage";

const UserInfo = ({ onClick, value, idx, className, user }) => {
  return (
    <li
      className={className}
      value={value}
      onClick={onClick}
      uid={user?.uid}
      idx={idx}
    >
      <ProfileImage src={user?.photoURL} className={"small-image"} />
      <div>
        <p className="user-info-name">
          <b>{user?.displayName}</b>
        </p>
        <p className="user-info-email">{user?.email}</p>
      </div>
    </li>
  );
};

export default UserInfo;
