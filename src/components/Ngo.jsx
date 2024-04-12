import React, { useState } from 'react';

export default function Ngo() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    food: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the request body with the form data
      const requestBody = JSON.stringify(formData);

      // Send a POST request to the server
      const response = await fetch('http://localhost:3000/api/ngo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: requestBody
});

      // Check if the request was successful
      if (!response.ok) {
        // If not, throw an error
        throw new Error(`Failed to submit restaurant details: ${response.statusText}`);
      }

      // If successful, clear the form and provide feedback to the user
      setFormData({
        name: '',
        address: '',
        food: ''
      });
      alert('Restaurant details submitted successfully!');
    } catch (error) {
      // Log and handle any errors
      console.error('Error submitting restaurant details:', error);
      alert('Failed to submit restaurant details. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2>NGO Portal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="food">Food:</label>
          <input
            type="text"
            id="food"
            name="food"
            value={formData.food}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
