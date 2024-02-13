import "./RemoveProfilePictureModal.css";
import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/shared/Modal";
import { AuthContext } from "../context/AuthContext";
import "firebase/firestore";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const RemoveProfilePictureModal = ({ setIsOpen }) => {
  const { userLogged } = useContext(AuthContext);

  const removeImage = async () => {
    try {
      await updateProfile(userLogged, {
        photoURL: "",
      });

      await updateDoc(doc(db, "users", userLogged.uid), {
        photoURL: "",
      });
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
  };

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="delete-image-header">
        <h3 className="heading">{`Delete your profile picture?`} </h3>
      </div>
      <div className="delete-img-content">
        <img
          className="modal-image"
          src={userLogged.photoURL || "blank-profile-picture.png"}
          alt=""
        />
      </div>
      <div className="delete-image-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => setIsOpen(false)}
          text="Cancel"
          icon=""
        ></Button>
        <Button
          className="fluid-btn primary no-margin"
          text="Delete image"
          icon=""
          onClick={removeImage}
        ></Button>
      </div>
    </Modal>
  );
};

export default RemoveProfilePictureModal;
