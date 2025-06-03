
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectIsAdmin, selectIsLoggedIn } from '../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const authStatus = useSelector(state => state.auth.status); // Add this to track loading state

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // While auth is loading, optionally show a loading placeholder or nothing
  if (authStatus === 'loading') {
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">FUNDhub</span>
          </Link>
        </div>
        <div className="navbar-right">
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FUNDhub</span>
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/about">About</Link>
        {/* Only show Admin Panel if user is logged in AND admin */}
        {isLoggedIn && isAdmin && <Link to="/admin">Admin Panel</Link>}

        {isLoggedIn ? (
          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="user-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                Profile
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                Settings
              </Link>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
