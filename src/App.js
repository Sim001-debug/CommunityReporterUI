import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import bgImage from './image/township.png';
//import './AppWelcome.css';

function App() {
  return (
    <div
      className="welcome-bg"
      style={{ backgroundImage: `url(${bgImage})})` }}
    >
      <Router>
        <Navbar/>
        <AppRoutes />
      </Router>
    </div>

    
  );
}

export default App;
