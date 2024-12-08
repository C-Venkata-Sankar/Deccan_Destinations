// src/components/Tourism_Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMapMarkedAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import logo from './bg1.jpg'; // Ensure the image path is correct
import './Tourism_Navbar.css';

function Tourism_Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="deccan-text">Deccan Destinations</h1>
      </div>
      <div className="navbar-links">
        <Link to="/tourism" className="nav-link">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/tour-planner" className="nav-link">
        
          <FontAwesomeIcon icon={faMapMarkedAlt} /> Tour Planner
        </Link>
        <div className="nav-link" onClick={() => window.location.assign('https://prismatic-gaufre-2b9998.netlify.app/')}>
  <FontAwesomeIcon icon={faLightbulb} /> Tour Tips
</div>

      </div>
    </nav>
  );
}

export default Tourism_Navbar;
