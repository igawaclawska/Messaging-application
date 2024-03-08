import "./RemoveProfilePictureModal.css";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/btn/Button";
import Modal from "../../components/shared/Modal";
import ProfileImage from "../../components/profile-image/ProfileImage";

const RemoveProfilePictureModal = ({ setIsOpen }) => {
  const { userLogged } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const removeImage = async () => {
    try {
      setLoading(true);
      await updateProfile(userLogged, {
        photoURL: "",
      });

      await updateDoc(doc(db, "users", userLogged.uid), {
        photoURL: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="delete-image-header">
        <h3 className="heading">{`Delete your profile picture?`} </h3>
      </div>
      <div className="delete-img-content">
        <ProfileImage src={userLogged.photoURL} className={"large-image"} />
      </div>
      <div className="delete-image-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="fluid-btn primary no-margin"
          onClick={removeImage}
          loading={loading}
        >
          Delete image
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveProfilePictureModal;
