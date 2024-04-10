import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRestaurantButtonClick = () => {
    navigate('/restaurant');
  };

  const handleUserButtonClick = () => {
    navigate('/BhookaPage');
  };

  return (
    <div>
      <h1>Welcome to Greentable</h1>
      <div>
        <button onClick={handleRestaurantButtonClick}>Restaurant</button>
        <button onClick={handleUserButtonClick}>User</button>
      </div>
    </div>
  );
}

