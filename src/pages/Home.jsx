// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 


const Home = () => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Crowdfunding Platform</h1>
      <p>Join us to create and support amazing campaigns!</p>
      <button onClick={handleAuthRedirect}>Login / Register</button>
    </div>
  );
};

export default Home;
