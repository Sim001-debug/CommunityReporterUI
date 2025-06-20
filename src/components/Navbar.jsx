import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X } from 'lucide-react';

export default function Navbar() {
    //const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 left-0 w-full flex justify-end p-6 text-white z-10">
            <div className="flex gap-6 text-lg">
                <Link to="/home" className="hover:underline">Home</Link>
                {/* <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link> */}
                <Link to="/map" className="hover:underline">Map View</Link>
                <Link to="/my-report" className="hover:underline">My Report</Link>
                {/* <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                <Link to="/report" onClick={() => setIsOpen(false)}>Report</Link> */}
            </div>
        </nav>
    );
}
