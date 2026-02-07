// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

function App() {
  const [user, setUser] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleRegister = (newUser) => {
    setRegisteredUser(newUser);
    alert("Registration successful! Please login.");
  };

  const handleLogin = (loginData) => {
    if (
      registeredUser &&
      loginData.email === registeredUser.email &&
      loginData.password === registeredUser.password
    ) {
      setUser(registeredUser);
      return true; // ✅ success
    }
    alert("Invalid email or password");
    return false; // ❌ failed
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/profile" /> : <Register onRegister={handleRegister} />}
        />

        <Route
          path="/profile"
          element={user ? <UserProfile user={user} /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
