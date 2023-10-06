import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import BusinessTable from './components/BusinessTable2'
import data from './data/data'
import AppRouter from './Approuter';


function App() {

  
  return (
    <div className="App">
      <Header />
      <AppRouter />
      {/* <BusinessTable data= {data} /> */}
     
    </div>
  );
}

export default App;
