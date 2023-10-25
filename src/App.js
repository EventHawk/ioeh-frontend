import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AppRouter from './Approuter';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import axios from 'axios';

axios.defaults.withCredentials=true;

function App() {

  
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRouter />      
      </div>
    </Router>
  );
}

export default App;
