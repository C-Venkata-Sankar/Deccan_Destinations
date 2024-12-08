import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        setEmail("");
        setPassword("");
        
        // Navigate to the tourism page on successful login
        navigate("/tourism");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div><Navbar />
    <div className="auth-container login-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <p>
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div></div>
  );
}

export default Login;
