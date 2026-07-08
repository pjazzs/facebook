
import './App.css';
import { Routes, Route } from 'react-router-dom';


import Register from './Components/Register';
import Activate from './Components/Activate';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:token" element={<Activate />} />
    </Routes>
  );
}

export default App;
