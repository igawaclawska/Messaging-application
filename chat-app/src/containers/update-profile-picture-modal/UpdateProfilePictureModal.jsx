import "./UpdateProfilePictureModal.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useUploadFiles } from "../../hooks/useUploadFile";
import Button from "../../components/button/Button";
import Modal from "../../components/shared/Modal";
import ProfileImage from "../../components/profile-image/ProfileImage";

const UpdateProfilePictureModal = ({ setIsOpen }) => {
  const { userLogged } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    file,
    downloadUrl,
    cancelUpload,
    handleSelectFile,
  } = useUploadFiles(userLogged);

  const updateDatabase = async () => {
    setLoading(true);
    try {
      await updateProfile(userLogged, {
        photoURL: downloadUrl,
      });
      await updateDoc(doc(db, "users", userLogged.uid), {
        photoURL: downloadUrl,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addImage = async () => {
    if (file !== null) {
      await updateDatabase();
    }
    setIsOpen(false);
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <header className="update-picture-header">
        <h1 className="update-picture-heading">
          {`Update your profile picture`}{" "}
        </h1>
      </header>
      <div className="update-img-content">
        {downloadUrl && (
          <ProfileImage src={downloadUrl} className={"large-image"} />
        )}
        <input
          className="upload"
          onChange={handleSelectFile}
          type="file"
          id="myFile"
          name="filename"
        />
      </div>
      <div className="delete-chat-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => {setIsOpen(false); cancelUpload()}}
        >
          Cancel
        </Button>
        <Button
          className="fluid-btn primary no-margin"
          onClick={addImage}
          loading={loading}
        >
          Update image
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
