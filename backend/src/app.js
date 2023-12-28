// src/app.js
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Placeholder for routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/todos', require('./routes/todoRoutes'));

module.exports = app;
