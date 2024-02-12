import "./Navbar.css";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from "../context/MessagesContext";
import { ChatsContext } from "../context/ChatsContext";
import { auth } from "../firebase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UpdateProfilePictureModal from "./UpdateProfilePictureModal";
import RemoveProfilePictureModal from "./RemoveProfilePictureModal";
import DropdownOptions from "../components/DropdownOptions";

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext);
  const { dispatch } = useContext(ChatsContext);
  const menuRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpatePictureModalOpen, setIsUpatePictureModalOpen] = useState(false);
  const [isRemovePictureModalOpen, setIsRemovePictureModalOpen] =
    useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("test");
  }, [setIsUpatePictureModalOpen]);

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };

  const handleClearRecipent = () => {
    dispatch({ type: "LOGOUT" });
  };

  const logImg = () => {
    console.log(userLogged);
  };

  const menuOptions = [
    {
      id: 1,
      label: "Remove profile picture",
      onClick: () => {
        setIsRemovePictureModalOpen(true);
      },
    },
    {
      id: 2,
      label: "Update profile picture",
      onClick: () => {
        setIsUpatePictureModalOpen(true);
      },
    },
    {
      id: 3,
      label: "Log-out",
      onClick: () => {
        signOut(auth);
        setMessages(null);
        handleClearRecipent();
        toLogin();
      },
    },
  ];

  return (
    // class nav-bar does not exist in css
    <nav className="nav-bar">
      <div className="navbar-wrapper">
        <span className="logo logo-small">MINI CHAT</span>
        <div ref={menuRef}>
          <button
            type="button"
            className={"fixed-btn secondary-white small with-icon"}
            onClick={toggleMenu}
          >
            <img
              className="profile-img"
              src={userLogged.photoURL || "blank-profile-picture.png"}
              alt=""
            />
            {userLogged.displayName || "User"}
            {isDropdownOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </button>
          <DropdownOptions isOpen={isDropdownOpen} options={menuOptions} />
        </div>
        {isUpatePictureModalOpen && (
          <UpdateProfilePictureModal setIsOpen={setIsUpatePictureModalOpen} />
        )}
        {isRemovePictureModalOpen && (
          <RemoveProfilePictureModal setIsOpen={setIsRemovePictureModalOpen} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
