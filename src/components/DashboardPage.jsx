import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { restaurantIdState } from './atoms';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({
    name: '',
    address: '',
    food: ''
  });
  const loggedInRestaurantId = useRecoilValue(restaurantIdState);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/restaurants/${loggedInRestaurantId}`);
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length !== 0) {
          setEditedRestaurant(data.restaurant);
        }
      } else {
        console.error('Error fetching restaurant data:', response.statusText);
      }
    } catch (err) {
      console.error('Error fetching restaurant data:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedInRestaurantId) {
      fetchRestaurants();
    }
  }, [loggedInRestaurantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRestaurant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      console.error('Still loading data, please wait...');
      return;
    }
    console.log('Submitting form with loggedInRestaurantId:', loggedInRestaurantId);
    try {
      if (!loggedInRestaurantId) {
        console.error('Error updating restaurant data2: Restaurant ID is null or undefined');//this line is being executed
        return;
      }
  
      const response = await fetch(`/api/restaurants/${loggedInRestaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedRestaurant)
      });
  
      if (!response.ok) {
        throw new Error(`Error updating restaurant data: ${response.statusText}`);
      }
  
      fetchRestaurants();
    } catch (err) {
      console.error('Error updating restaurant data:', err);
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
            <input type="text" name="name" value={editedRestaurant.name || ''} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={editedRestaurant.address || ''} onChange={handleInputChange} />
          </label>
          <label>
            Food:
            <input type="text" name="food" value={editedRestaurant.food || ''} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
