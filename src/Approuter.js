// AppRouter.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EditBusiness from './components/EditBusiness'; // Create this component
import { apiBaseUrl } from './apiConfig';
import { useLogin } from "./LoginProvider";
// import { checkAuthentication } from './apiConfig';

// const PrivateRoute = ({ element, isAuthenticated, fallbackPath }) => {
//   return isAuthenticated ? element : <Navigate to={fallbackPath} replace />;
// };

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const AppRouter = () => {
  
  // const isAuthenticated = getCookie('authenticated') === 'true';
  // console.log(getCookie('authenticated'));
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  // const isAuthenticated = false;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-business"
        element={
          isLoggedIn ? <EditBusiness /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

// function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
//   return (
//     <Route {...rest} render={(props) => (
//       isAuthenticated ? <Component {...props} />
//     : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
//   );
// }


export default AppRouter;
