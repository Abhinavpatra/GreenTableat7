import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.modules.css'; // Import CSS module without treating it as a module


export default function LandingPage() {
  const navigate = useNavigate();

  const handleRestaurantButtonClick = () => {
    navigate('/restaurant');
  };

  const handleUserButtonClick = () => {
    navigate('/BhookaPage');
  };
  const handleChallengedClick=()=>{
    navigate('/listenPage');
  }
  return (
    <>
      <div className="context">
        <h1>Welcome to Greentable</h1>
        <div>
          <button onClick={handleRestaurantButtonClick}>Restaurant</button>
          <button onClick={handleUserButtonClick}>User</button>
          <button onClick={handleChallengedClick} className='specialButton'>FOR HEARING</button>
        </div>
      </div>

      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </>
  );
}