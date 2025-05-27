
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectIsAdmin, selectIsLoggedIn } from '../features/auth/authSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      {isLoggedIn && <Link to="/campaigns">Campaigns</Link>}
      {isAdmin && <Link to="/admin">Admin Panel</Link>}

      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/auth">Login / Register</Link>
      )}
    </nav>
  );
};

export default Navbar;
