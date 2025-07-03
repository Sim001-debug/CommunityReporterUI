import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import bgImage from './image/township.png';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const token = localStorage.getItem("token");

  return (
    <div
      className="welcome-bg"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', height: '100vh' }}
    >
      <Router>
        {token && <Navbar />}

        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<AppRoutes />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
