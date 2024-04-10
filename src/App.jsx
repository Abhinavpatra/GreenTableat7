import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RestarauntAuth from './components/RestaurauntAuth';
import Dashboard from './components/DashboardPage';
import Login from './components/Login';
import Signup from './components/Signup';
import BhookaPage from './components/BhookaPage';
import './App.css'

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
              <RestarauntAuth />
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
        <Route path='/signup' element={<Suspense fallback={<div>Loading...</div>}>
        <Signup/>
        </Suspense>} > </Route>

        <Route
          path="/BhookaPage"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BhookaPage />
            </Suspense>
          }
          
        />
      </Routes>
    </BrowserRouter>
  );
}


