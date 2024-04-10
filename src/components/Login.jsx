// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { restaurantIdState } from './atoms'; // Import Recoil hooks and atom

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setRestaurantId = useSetRecoilState(restaurantIdState); // Recoil hook to set the restaurant ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      // Assuming the server sends back the restaurant ID after login
      const loggedInRestaurantId = response.data.loggedInRestaurantId;
      // Set the restaurant ID in Recoil state
      setRestaurantId(loggedInRestaurantId);

      console.log(response.data)
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/signup')}>Don't have an account? Sign up here.</button>
    </div>
  );
}

export default Login;
