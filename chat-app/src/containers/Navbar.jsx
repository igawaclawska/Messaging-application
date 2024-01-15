import './Navbar.css'
import React, { useContext } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };
  return (
    // class nav-bar does not exist in css
    <nav className="nav-bar">
      <div className="navbar-wrapper">
        <span className="logo logo-small">ITU CHAT</span>
        <Button
          text={userLogged.displayName}
          icon={<LogoutSharpIcon />}
          className="fixed-btn secondary-white small with-icon"
          onClick={() => {
            signOut(auth);
            toLogin();
          }}
        ></Button>
      </div>
    </nav>
  );
};

export default NavBar;
