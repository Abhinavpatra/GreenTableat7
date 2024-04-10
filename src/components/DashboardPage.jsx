// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { restaurantIdState } from './atoms';

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [editedRestaurant, setEditedRestaurant] = useState({
    name: '',
    address: '',
    food: '' // Add more fields if you know what you're doing
  });

  // Access the almighty restaurant ID from the sacred atom using Recoil, bcz i learnt it 2-3 days ago
  const loggedInRestaurantId = useRecoilValue(restaurantIdState);

  // Fetch  restaurant data for the goddamn logged-in admin using the restaurantId
  const fetchRestaurants = async () => {
    try {
      if (!loggedInRestaurantId) {
        console.error('Fucking hell! Restaurant ID is not defined.');
        return;
      }

      // Fetch restaurant data for the elite admin using the restaurantId
      const response = await axios.get(`/api/restaurants/${loggedInRestaurantId}`);
      setRestaurants(response.data);
    } catch (err) {
      console.error('Fuck! Error fetching restaurants:', err);
    }
  };

  useEffect(() => {

    fetchRestaurants();
  }, [loggedInRestaurantId]); // Include loggedInRestaurantId in the dependency array because it's essential

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRestaurant({
      ...editedRestaurant,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInRestaurantId) {
      console.error('What the fuck! Restaurant ID is not defined.');
      return;
    }

    try {
      await axios.put(`/api/restaurants/${loggedInRestaurantId}`, editedRestaurant);
      // After successful update, fetch updated restaurant data because why the hell not?
      fetchRestaurants();
    } catch (err) {
      console.error('Shit! Error updating restaurant data:', err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Edit Restaurant Data</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={editedRestaurant.name} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={editedRestaurant.address} onChange={handleInputChange} />
          </label>
          <label>
            Food:
            <input type="text" name="food" value={editedRestaurant.food} onChange={handleInputChange} />
          </label>
          {/* Add more input fields for other restaurant data if you're a fucking perfectionist */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}