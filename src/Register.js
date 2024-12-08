import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./Navbar";

function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before making the request
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      setError(""); // Clear error if passwords match
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword, // Now confirmPassword is included in the request body
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage(data.message);
        setusername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container register-container">
        <div className="auth-form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <label>Email</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <label>Password</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <label>Confirm Password</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <p>
              Already have an account? <Link to="/">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
