import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';  
import './Navbar.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = ({ favoritesCount = 0 }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Movie Explorer</h1>
        <Link smooth to="/#popular" className="nav-link">Popular</Link>
        <Link smooth to="/#top_rated" className="nav-link">Top Rated</Link>
      </div>

      <div className="navbar-right">

        {/* Favorite Movies  */}
        <Link to="/favorites" className="icon-btn" title="Favorite Movies">
          <div style={{ position: 'relative' }}>
            <FavoriteIcon style={{ color: 'yellow' }} />
             
          </div>
        </Link>

        {/* Dark Mode  */}
        <button onClick={toggleTheme} className="icon-btn" title="Toggle theme">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </button>

         
      </div>
    </nav>
  );
};

export default Navbar;
