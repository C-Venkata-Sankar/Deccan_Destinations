import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus, faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Import the image directly
import logo from './bg1.jpg';  // Make sure the image is in the same folder as this component

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="deccan-text">Deccan Destinations</h1> {/* Apply class for color change */}
      </div>
      <div className="navbar-links">
        <Link to="/"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
        <Link to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
        <Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact Us</Link> {/* Added Contact Us link */}
      </div>
    </nav>
  );
}

export default Navbar;
