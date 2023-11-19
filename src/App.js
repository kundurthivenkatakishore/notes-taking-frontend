import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './commponents/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
