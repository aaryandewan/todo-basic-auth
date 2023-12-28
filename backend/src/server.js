// src/server.js
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config");
connectDB(); // Connect to the database

const app = require("./app"); // Import the Express application
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
