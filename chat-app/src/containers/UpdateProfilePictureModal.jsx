import "./UpdateProfilePictureModal.css";
import React, { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";
import { AuthContext } from "../context/AuthContext";
import "firebase/firestore";
import { db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const UpdateProfilePictureModal = ({ setIsOpen }) => {
  const { userLogged } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleChange = (e) => {
    setImageUrl(null);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setImageUrl(imageUrl);

    console.log(selectedFile);
  };

  const addImage = async () => {
    if (file !== null) {
      try {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${userLogged.displayName + date}`);
        if (file !== undefined) {
          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
              try {
                await updateProfile(userLogged, {
                  photoURL: downloadUrl,
                });
                await updateDoc(doc(db, "users", userLogged.uid), {
                  photoURL: downloadUrl,
                });
                window.location.reload();
              } catch (err) {
                console.log(err);
              }
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsOpen(false);
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="update-picture-header">
        <h3 className="update-picture-heading">
          {`Update your profile picture`}{" "}
        </h3>
      </div>
      <div className="update-img-content">
        {imageUrl && (
          <img
            className="modal-update-image"
            src={imageUrl || "blank-profile-picture.png"}
            alt=""
          />
        )}
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
          text="Cancel"
          icon=""
        ></Button>
        <Button
          className="fluid-btn primary no-margin"
          text="Update image"
          icon=""
          onClick={addImage}
        ></Button>
      </div>
    </Modal>
  );
};

export default UpdateProfilePictureModal;