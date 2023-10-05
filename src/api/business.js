// api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to fetch data from the API
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/endpoint`);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
};

// Function to send data to the API (e.g., for creating a new resource)
export const sendData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/endpoint`, data);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
};
