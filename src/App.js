import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AppRouter from './Approuter';
import { BrowserRouter} from 'react-router-dom'; // Import Router
import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials=true;


function App() {

  return (
      <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
      </div>
   
  );
}

export default App;
