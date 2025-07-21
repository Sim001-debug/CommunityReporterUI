import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="absolute top-0 left-0 w-full flex justify-end p-6 text-white z-10">
            <div className="flex gap-6 text-lg">
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/map" className="hover:underline">Map View</Link>
                <Link to="/my-report" className="hover:underline">My Report</Link>
                <Link to="/register" className="hover:underline">Register</Link>
            </div>
        </nav>
    );
}
