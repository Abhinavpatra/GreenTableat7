import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BhookaPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Save food wastage </h2>
      <div>
        <h3>Restaurants</h3>
        <div>
          {/* Check if restaurants is an array before mapping */}
          {Array.isArray(restaurants) && restaurants.map((restaurant, index) => (
            <div key={index}>
              <h4>{restaurant.name}</h4>
              <p>Address: {restaurant.address}</p>
              <p>Food available: {restaurant.food}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
