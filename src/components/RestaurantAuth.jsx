import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RestaurauntAuth.css';

export default function RestaurantAuth() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleNgoPortal = () => {
    navigate('/ngo');
  };

  return (
    <div className="container">
        <div className="heading">Restaurant</div>
      <div className="button-container">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleNgoPortal}>NGO Portal</button> {/* New button for accessing the NGO portal */}
      </div>
    </div>
  );
}
