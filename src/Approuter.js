// AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddBusiness from './pages/AddBusiness';
import ViewBusiness from './pages/ViewBusiness';
import Login from './pages/Login'



const AppRouter = () => {

  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        {/* Add your protected routes here */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <div>Dashboard content here</div> : <Navigate to="/login" />}
        />
        {/* Redirect to login if the route is not recognized */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
