import "./Navbar.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import { ChatsContext } from "../context/ChatsContext";
import { auth } from "../firebase";
import UpdateProfilePictureModal from "./UpdateProfilePictureModal";
import RemoveProfilePictureModal from "./RemoveProfilePictureModal";
import DropdownMenu from "../components/DropdownMenu";

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext);
  const { dispatch } = useContext(ChatsContext);
  const [isUpdatePictureModalOpen, setIsUpdatePictureModalOpen] =
    useState(false);
  const [isRemovePictureModalOpen, setIsRemovePictureModalOpen] =
    useState(false);

  useEffect(() => {
    console.log("test");
  }, [setIsUpdatePictureModalOpen]);

  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };

  const handleClearRecipent = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleOpenUpdatePictureModal = () => {
    setIsUpdatePictureModalOpen(true);
  };

  const handleOpenRemovePictureModal = () => {
    setIsRemovePictureModalOpen(true);
  };

  const handleLogOut = () => {
    signOut(auth);
    setMessages(null);
    handleClearRecipent();
    toLogin();
  };

  const menuOptions = [
    {
      id: 1,
      label: "Remove profile picture",
      onClick: handleOpenRemovePictureModal,
    },
    {
      id: 2,
      label: "Update profile picture",
      onClick: handleOpenUpdatePictureModal,
    },
    {
      id: 3,
      label: "Log-out",
      onClick: handleLogOut,
    },
  ];

  return (
    // class nav-bar does not exist in css
    <nav className="nav-bar">
      <div className="navbar-wrapper">
        <span className="logo logo-small">MINI CHAT</span>
        <DropdownMenu menuOptions={menuOptions} hasCaret={true}>
          <img
            className="profile-img"
            src={userLogged.photoURL || "blank-profile-picture.png"}
            alt=""
          />
          {userLogged.displayName}
        </DropdownMenu>
        {isUpdatePictureModalOpen && (
          <UpdateProfilePictureModal setIsOpen={setIsUpdatePictureModalOpen} />
        )}
        {isRemovePictureModalOpen && (
          <RemoveProfilePictureModal setIsOpen={setIsRemovePictureModalOpen} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
