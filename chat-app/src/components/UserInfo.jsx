const UserInfo = ({ onClick, value, displayName, uid, email, idx }) => {
  return (
    <div
      className={"user-info"}
      value={value}
      onClick={onClick}
      uid={uid}
      idx={idx}
    >
      <p className="user-info-name">
        <b>
          {idx + 1}. {displayName}
        </b>
      </p>
      <p className="user-info-email">{email}</p>
    </div>
  );
};

export default UserInfo;
