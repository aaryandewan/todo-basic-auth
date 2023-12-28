// src/app.js
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

module.exports = app;
