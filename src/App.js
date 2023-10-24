import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import BusinessTable from './components/BusinessTable2'
import data from './data/data'
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
        {/* <BusinessTable data= {data} /> */}
      
      </div>
    </Router>
  );
}

export default App;
