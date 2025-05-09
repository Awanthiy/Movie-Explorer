import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
         
      </div>
    </Router>
  );
}

export default App;
