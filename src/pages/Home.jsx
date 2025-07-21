import { Link } from "react-router-dom"
import '../AppWelcome.css';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return(
        <div className="home-container">
            {/* Top Bar */}
            <div className="top-bar">
                <h1 className="app-title">Community Reporter</h1>
                <div className="nav-links">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/map" className="nav-link">Map View</Link>
                    <Link to="/my-report" className="nav-link">My Report</Link>
                </div>
            </div>

            {/* Centered Content */}
            <div className="center-content">
                <h2 className="main-header">Report community Issues</h2>
                <p className="sub-paragraph">
                    Use our app to post report issues in your community. Whether it's potholes,
                    electricity problems, or safety concerns, we've got you covered.
                </p>
                <motion.div
                    className="post-report-button"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/report")}
                >Post a Report</motion.div>
            </div>
        </div>
    );
};
