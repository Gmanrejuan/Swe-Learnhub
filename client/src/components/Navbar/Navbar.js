import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/interview" className="navbar-link">Interview</Link>
        <Link to="/question" className="navbar-link">Question</Link>
        <Link to="/write" className="navbar-link">Write</Link>
      </div>
      <div className="navbar-right">
        <Link to="/signin" className="navbar-link">Login</Link>
        <Link to="/signup" className="navbar-link">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;