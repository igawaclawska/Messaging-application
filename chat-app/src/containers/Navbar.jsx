import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import '../styles.css'

const NavBar = ({ onLoad }) => {
  return (
    <nav className="nav-bar">
      <div className="navbarWrapper">
        <span className="logoNav">I T U  C H A T</span>
        <TertiaryButton text='Logout' className='tertiaryBtn-white'></TertiaryButton>
      </div>
    </nav>
  );
}

export default NavBar;