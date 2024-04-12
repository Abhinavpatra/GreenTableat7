import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BhookPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(true); // State to track if speech synthesis is active

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants');
        setRestaurants(response.data);
        speakRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  // Standard demo content for restaurant names, addresses, and food
  const demoRestaurants = [
    { name: 'Demo Restaurant 1', address: '123 Main St', food: 'Burger, Pizza' },
    { name: 'Demo Restaurant 2', address: '456 Elm St', food: 'Pasta, Salad' },
    { name: 'Demo Restaurant 3', address: '789 Oak St', food: 'Sushi, Ramen' }
  ];

  // Function to speak the restaurant details
  const speakRestaurants = (data) => {
    let restaurantsArray = Array.isArray(data) ? data : [];

    // If data is not available or not an array, speak demo content
    if (!Array.isArray(data) || data.length === 0) {
      let restaurantDetails = 'good afternoon';
      demoRestaurants.forEach((restaurant) => {
        restaurantDetails += `Restaurant: ${restaurant.name}. Address: ${restaurant.address}. Food Available: ${restaurant.food}. `;
      });
      
      // Create SpeechSynthesisUtterance object with demo content
      const msg = new SpeechSynthesisUtterance();
      msg.text = restaurantDetails;

      // Event listener to track when speech synthesis starts and ends
      msg.onstart = () => setIsSpeaking(true);
      msg.onend = () => setIsSpeaking(false);

      // Speak the demo message
      window.speechSynthesis.speak(msg);
    } else {
      // Concatenate restaurant details into a single string
      let restaurantDetails = 'Here are the available restaurants. ';
      restaurantsArray.forEach((restaurant) => {
        if (!restaurant.name || !restaurant.address || !restaurant.food) {
          console.error('Error: Invalid restaurant data format');
          return;
        }
        restaurantDetails += `Restaurant: ${restaurant.name}. Address: ${restaurant.address}. Food Available: ${restaurant.food}. `;
      });

      // Create SpeechSynthesisUtterance object with restaurant details
      const msg = new SpeechSynthesisUtterance();
      msg.text = restaurantDetails;

      // Event listener to track when speech synthesis starts and ends
      msg.onstart = () => setIsSpeaking(true);
      msg.onend = () => setIsSpeaking(false);

      // Speak the message
      window.speechSynthesis.speak(msg);
    }
  };

  // Function to stop speech synthesis
  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stop speech synthesis
    setIsSpeaking(false); // Update state to reflect that speech synthesis is stopped
  };

  return (
    <div>
      <h2>Save Food Wastage</h2>
      <div>
        <h3>Restaurants</h3>
        <div>
          {/* Check if restaurants is an array before mapping */}
          {Array.isArray(restaurants) && restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <div key={index}>
                <h4>{restaurant.name}</h4>
                
                <p>Address: {restaurant.address}</p>
                <p>Food Available: {restaurant.food}</p>
              </div>
            ))
          ) : (
            demoRestaurants.map((restaurant, index) => (
              <div key={index}>
                <p>Restaurant:{restaurant.name}</p>
                <p>Address: {restaurant.address}</p>
                <p>Food Available: {restaurant.food}</p>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Button to stop speech synthesis */}
      {isSpeaking && <button onClick={stopSpeaking}>Stop Narration</button>}
    </div>
  );
}
