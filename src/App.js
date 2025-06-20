import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App h-full">
      <BrowserRouter>
        <Navbar/>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
