import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import LoginForm from '../components/LoginForm';
import axios from 'axios';

// axios.defaults.withCredentials=true;

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(''); // Initialize an error state

  const navigate = useNavigate(); // Get the navigate function

  // method no. 2

  const handleLogin = async (username, password) => {
    const apiUrl = 'http://localhost:3000/login';
    console.log("inside handle login");
    try {
      await axios.post(apiUrl, {
        username, password
      })
        .then((response) => {
          console.log(response);
          navigate('/dashboard');
        });
    } catch (err) {
      console.error(err);
      setError('Authentication failed due to a network error.');
    }
  }

  // const handleLogin = async (username, password) => {
  //   // Add your authentication logic here.
  //   // This is where you would typically make an API request to verify
  //   // the username and password.

  //   const apiUrl = 'http://localhost:3000/login';

  //   // For simplicity, we'll simulate successful authentication.
  //   try {
  //   const response = await fetch(apiUrl, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   });

  //   if (response.ok) {
  //     // Authentication was successful
  //     setIsAuthenticated(true);
  //     navigate('/dashboard'); // Redirect to the /dashboard route
  //   } else {
  //     // Authentication failed, show an error message or handle it as needed.
  //     setError('Authentication failed. Please check your username and password.');
  //   }
  // } catch (error) {
  //   console.error('Error during authentication:', error);
  //   setError('Authentication failed due to a network error.');
  // }
  // };

  // const handleLogin = (username, password) => {
  //   // Add your authentication logic here.
  //   // This is where you would typically make an API request to verify
  //   // the username and password.

  //   // For simplicity, we'll simulate successful authentication.
  //   if (username === 'exampleuser' && password === 'examplepassword') {
  //     setIsAuthenticated(true);
  //     navigate('/dashboard'); // Redirect to the /dashboard route
  //   } else {
  //     // Authentication failed, show an error message or handle it as needed.
  //     // alert('Authentication failed. Please check your username and password.');
  //     setError('Authentication failed. Please check your username and password.');

  //   }
  // };

  return (
    <div>
      {isAuthenticated ? (
        // User is authenticated, display authenticated content or redirect
        // to the dashboard.
        <div>
          <h2>Welcome, User!</h2>
          {/* Add authenticated content here */}
        </div>
      ) : (
        // User is not authenticated, display the login form.
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default Login;
