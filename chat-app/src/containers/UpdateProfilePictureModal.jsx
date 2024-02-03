import "./DeleteChatModal.css";
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

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const addImage = async () => {
    try {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userLogged.displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          try {
            await updateProfile(userLogged, {
              photoURL: downloadUrl,
            });
            await updateDoc(doc(db, "users", userLogged.uid), {
              photoURL: downloadUrl,
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = async () => {
    try {
      await updateProfile(userLogged, {
        photoURL: "",
      });

      await updateDoc(doc(db, "users", userLogged.uid), {
        photoURL: "",
      });
    } catch (err) {}
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="delete-chat-header">
        <h3>{`Update your profile picture`} </h3>
      </div>
      <form>
        <input
          onChange={handleChange}
          type="file"
          id="myFile"
          name="filename"
        />
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
      </form>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
