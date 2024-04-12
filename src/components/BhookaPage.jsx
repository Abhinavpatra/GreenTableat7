import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BhookaPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants');
        console.log(response.data.users)
        setRestaurants(response.data.users);
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

  return (
    <div>
      <h2>Save Food Wastage</h2>
      <div>
        <h3>Restaurants</h3>
        <div>
          {/* Check if restaurants is an array before mapping */}
          {Array.isArray(restaurants) && restaurants.length > 0 ? 
          (
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
                <h4>{restaurant.name}</h4>
                <p>Address: {restaurant.address}</p>
                <p>Food Available: {restaurant.food}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
