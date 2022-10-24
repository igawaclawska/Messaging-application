import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import '../styles.css'

const NavBar = ({ onLoad }) => {
  return (
    <nav className="nav-bar">
      <div className="navbarWrapper">
        <span className="logoNav">I T U  C H A T</span>
        <div className="logOutSection"><TertiaryButton className="tertiaryBtn" text='Logout'></TertiaryButton>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;