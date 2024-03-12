import "./UpdateProfilePictureModal.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Button from "../../components/button/Button";
import Modal from "../../components/shared/Modal";
import ProfileImage from "../../components/profile-image/ProfileImage";

const UpdateProfilePictureModal = ({ setIsOpen }) => {
  const { userLogged } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uploadFile = async () => {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userLogged.displayName + date}`);
      if (file !== undefined) {
        try {
          // Upload file to storage
          await uploadBytesResumable(storageRef, file);
          // Get download URL
          const url = await getDownloadURL(storageRef);
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setImageUrl(null); //reset image
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setImageUrl(imageUrl);
  };

  const addImage = async () => {
    if (file !== null) {
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
      } finally {
        setLoading(false);
      }
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
        {imageUrl && <ProfileImage src={imageUrl} className={"large-image"} />}
        <input
          className="upload"
          onChange={handleChange}
          type="file"
          id="myFile"
          name="filename"
        />
      </div>
      <div className="delete-chat-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => setIsOpen(false)}
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
