import { useState, useEffect } from "react";
import {
  getStorage,
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuid } from "uuid";

export const useUploadFiles = (userLogged) => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  useEffect(() => {
    const uploadFile = async () => {
      const storageRef = ref(
        storage,
        `ImageSentViaChat-by-${userLogged.displayName}-${uuid()}`
      );
      if (file) {
        try {
          setLoadingImg(true);
          await uploadBytesResumable(storageRef, file);
          const url = await getDownloadURL(storageRef);
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        setLoadingImg(false);
      }
    };
    uploadFile();
  }, [file, userLogged]);

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const cancelUpload = async () => {
    const storage = getStorage();
    const desertRef = ref(storage, downloadUrl);
    deleteObject(desertRef)
      .then(() => {
        console.log("file deleted");
      })
      .catch((error) => {
        console.error(error);
      });

    setDownloadUrl(null);
    setFile(null);
  };

  return {
    loadingImg,
    downloadUrl,
    setDownloadUrl,
    file,
    setFile,
    cancelUpload,
    handleSelectFile,
  };
};
