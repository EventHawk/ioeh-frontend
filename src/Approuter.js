// AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddBusiness from './pages/AddBusiness';
import ViewBusiness from './pages/ViewBusiness';
import Login from './pages/Login'
import TabbedPaper from './components/Dashboard'
import EditBusiness from './components/EditBusiness'; // Create this component



const AppRouter = () => {

  const isAuthenticated = localStorage.getItem('authToken');

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<TabbedPaper />} />
          {/* Add your protected routes here */}
          {/* <Route
            path="/dashboard"
            element={isAuthenticated ? <TabbedPaper />: <Navigate to="/login" />}
          /> */}
          {/* Redirect to login if the route is not recognized */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        <Route path="/edit-business" element={<EditBusiness />} />
        <Route path="/" element={<Home />} />
      </Routes>
  );
};

export default AppRouter;
