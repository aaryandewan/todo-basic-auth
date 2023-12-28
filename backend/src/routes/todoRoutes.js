// src/routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, todoController.getTodos);
router.post("/", authMiddleware, todoController.addTodo);

// Add other routes for update and delete

module.exports = router;
