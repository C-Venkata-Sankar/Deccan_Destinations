import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import "./App.css";
import TourismFrames from "./Tourism.js";
import TourPlanner from "./TourPlanner"; // Import the TourPlanner component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tourism" element={<TourismFrames />} />
          <Route path="/tour-planner" element={<TourPlanner />} /> {/* Add a route for TourPlanner */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
