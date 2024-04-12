import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RestaurantAuth from './components/RestaurantAuth';
import Dashboard from './components/DashboardPage';
import Login from './components/Login';
import Signup from './components/Signup';
import BhookaPage from './components/BhookaPage'; 
import NgoPortal from './components/Ngo';
import './App.css';
import BhookPage from './components/ListenPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LandingPage />
            </Suspense>
          } 
        />
        <Route
          path="/restaurant"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <RestaurantAuth />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/ngo" // New route for the NGO portal
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NgoPortal />
            </Suspense>
          }
        />
        <Route
          path="/bhookaPage"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BhookaPage />
            </Suspense>
          }
        />
        <Route
          path="/listenPage"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BhookPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
