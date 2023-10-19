import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import data from './data/data'
import AppRouter from './Approuter';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router



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
