import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { apiBaseUrl } from '../apiConfig';
import { useLogin } from '../LoginProvider';

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}


const Login = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn,setIsLoggedIn } = useLogin();

  const handleLogin = async (username, password) => {
    const apiUrl = apiBaseUrl + '/login';
    
    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      if (response.status === 200) {
        // If the login is successful, update the 'connect.sid' cookie
        // document.cookie = 'connect.sid=' + response.data.sessionId;
        setIsLoggedIn(true); 
        console.log("status is ok");
        setTimeout(() => {
          setCookie('authenticated', true, 1);
        }, 1000);
        setTimeout(() => {
          // window.location.reload(true);

        }, 1500); 
        // // window.location.reload(true);
        // setIsAuthenticated(true);
        // navigate('/dashboard', { replace: true }); 
      } else {
        setError('Authentication failed. Please check your username and password.');
      }
    } catch (err) {
      console.error(err);
      setError('Authentication failed due to a network error.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        navigate('/dashboard') 
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default Login;
