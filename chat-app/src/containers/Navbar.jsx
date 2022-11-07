import React from 'react';
import SecondaryButton from '../components/SecondaryButton'
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
        <SecondaryButton text='Logout' className='fixed-btn secondary-white small' onClick={toLogin} icon={''}></SecondaryButton>
      </div>
    </nav>
  );
}

export default NavBar;