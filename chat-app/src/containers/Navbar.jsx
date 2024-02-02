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

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext);
  const { dispatch } = useContext(ChatsContext);
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };

  const handleClearRecipent = () => {
    dispatch({ type: "LOGOUT" });
  };

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
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            {userLogged.displayName}
            {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li className="menu-item">Remove profile picture</li>
              <li className="menu-item">
                Update profile picture
                {/* <form>
                  <input type="file" id="myFile" name="filename" />
                  <input type="submit" />
                </form> */}
              </li>
              <li
                onClick={() => {
                  signOut(auth);
                  setMessages(null);
                  handleClearRecipent();
                  toLogin();
                }}
                className="menu-item"
              >
                Log-out
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
