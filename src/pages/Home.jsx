import { Link } from "react-router-dom"
import bgImage from '../image/township.png';
import '../AppWelcome.css';

export const Home = () => {
    return(
        <div 
            className="welcome-bg"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Navbar */}
            <div className="navbar">
                <h1 className="text-2xl font-bold">Community Reporter</h1>
                <div className="flex space-x-6">
                    <Link to="/home">Home</Link>
                    <Link to="/map">Map View</Link>
                    <Link to="/my-report">My Report</Link>
                </div>
            </div>

            {/* Centered Content */}
            <div className="center-content">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Report community issues</h2>
                <p className="mb-6 text-lg drop-shadow-md max-w-xl">
                    Use our app to post report issues in your community. Whether it's potholes,
                    electricity problems, or safety concerns, we've got you covered.
                </p>
                <Link
                    to="/report"
                    className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition"
                >
                    Post a report
                </Link>
            </div>
        </div>
    );
};
