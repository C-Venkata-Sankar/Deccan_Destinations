const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // For password hashing
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your own MongoDB URI)
mongoose.connect("mongodb+srv://sankarpandu2004:sankar1234@cluster0.x3cps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// User model
const User = mongoose.model("User", new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Only email is unique
  password: { type: String, required: true },
}));

// Registration route (POST /api/register)
app.post("/api/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate that passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
});

// Login route (POST /api/login)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  res.status(200).json({ message: "Login successful!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
