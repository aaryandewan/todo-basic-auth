// src/controllers/todoController.js
const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text, user: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add other CRUD operations (updateTodo, deleteTodo) here
