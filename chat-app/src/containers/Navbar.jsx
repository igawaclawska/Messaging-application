import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import { useNavigate } from "react-router-dom";
import '../styles.css'

const NavBar = ({ onLoad }) => {
  let navigate = useNavigate(); 
  const toLogin = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  return (
    <nav className="nav-bar">
      <div className="navbarWrapper">
        <span className="logoNav">I T U  C H A T</span>
        <TertiaryButton text='Logout' className='tertiaryBtn-white' onClick={toLogin}></TertiaryButton>
      </div>
    </nav>
  );
}

export default NavBar;