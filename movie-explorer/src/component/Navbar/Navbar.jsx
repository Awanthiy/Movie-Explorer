import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = () => {
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
        <Link to="/" className="logo">🎬 Movie Explorer</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/trending" className="nav-link">Trending</Link>
      </div>

      <div className="navbar-right">
        <button onClick={toggleTheme} className="icon-btn" title="Toggle theme">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </button>
        <button onClick={toggleLogin} className="icon-btn" title={isLoggedIn ? 'Logout' : 'Login'}>
          <AccountCircleIcon style={{ color: isLoggedIn ? 'lightgreen' : 'inherit' }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
