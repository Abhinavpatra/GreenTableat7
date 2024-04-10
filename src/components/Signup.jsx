// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      // Generate a unique restaurant ID (e.g., using UUID or a similar method)
      const restaurantId = generateRestaurantId();
      
      // Send restaurant details along with the generated restaurant ID to the server for signup
      
      await axios.post('http://localhost:3000/signup', {name, email, password, restaurantId});

      // Redirect to the login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Function to generate a unique restaurant ID
  const generateRestaurantId = () => {
    // Implement your logic to generate a unique restaurant ID here
    // making up some random sets of digits, to give to the nice restraunt or dhaba vala.
    return Math.floor(Math.random() * 1000000);
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Restaurant Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
