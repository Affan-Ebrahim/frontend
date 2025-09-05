import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navbar";
import ReservationForm from "./components/pages/ReservationForm";
import ReservationList from "./components/pages/ReservationList";
import ReservationDetail from "./components/pages/ReservationDetail";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup"; // Import Signup component
import Home from "./components/pages/Home";
import "./index.css";
import Vehicles from "./components/pages/Vehicles";
import Tickets from "./components/pages/Tickets";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNewReservation = () => setRefreshFlag(f => f + 1);

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? 
            <Navigate to="/home" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/home" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isLoggedIn ? 
            <Navigate to="/login" replace /> : 
            <Signup onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/home" 
          element={
            isLoggedIn ? 
            <Home /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/reservations" 
          element={
            isLoggedIn ? 
            <div className="min-h-screen bg-gray-100 p-6">
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReservationForm onSuccess={handleNewReservation} />
                <div className="bg-white p-4 rounded shadow">
                  <ReservationList refreshFlag={refreshFlag} />
                </div>
              </div>
            </div> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/reservation/:id" 
          element={
            isLoggedIn ? 
            <ReservationDetail /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/vehicles" 
          element={
            isLoggedIn ? 
             <Vehicles />: 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/tickets" 
          element={
            isLoggedIn ? 
            <Tickets />: 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}




