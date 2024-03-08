import "./ProfileImage.css";

const ProfileImage = ({ src, className }) => {
  return (
    <img
      className={className}
      src={src || "blank-profile-picture.png"}
      alt=""
    />
  );
};

export default ProfileImage;
