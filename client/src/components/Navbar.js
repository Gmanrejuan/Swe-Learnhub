import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#222", padding: "1rem" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
      <Link to="/interview" style={{ color: "white", marginRight: "20px" }}>Interview</Link>
      <Link to="/question" style={{ color: "white" }}>Question</Link>
    </nav>
  );
}

export default Navbar;
