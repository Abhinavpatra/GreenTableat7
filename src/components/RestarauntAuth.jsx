import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RestaurantAuth() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>Restaurant</h2>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

