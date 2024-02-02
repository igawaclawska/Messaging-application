import './Navbar.css'
import React, { useContext } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { MessagesContext } from '../context/MessagesContext';
import { ChatsContext } from "../context/ChatsContext";
import { auth } from "../firebase";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  const { setMessages } = useContext(MessagesContext); 
  const { dispatch } = useContext(ChatsContext);


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
        <Button
          imageSource={true}
          text={userLogged.displayName}
          icon={<LogoutSharpIcon />}
          className="fixed-btn secondary-white small with-icon"
          onClick={() => {
            signOut(auth);
            setMessages(null);
            handleClearRecipent();
            toLogin();
          }}
        ></Button>
      </div>
    </nav>
  );
};

export default NavBar;
