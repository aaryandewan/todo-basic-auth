import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button,AppBar,Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../AuthContext';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../services/todoService';
import { useNavigate } from 'react-router-dom';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const { auth,logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (auth.token) {
        const fetchedTodos = await getTodos(auth.token);
        setTodos(fetchedTodos);
      }
    };
    fetchTodos();
  }, [auth.token]);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '' && auth.token) {
      const addedTodo = await addTodo(newTodo, auth.token);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (auth.token) {
      await deleteTodo(id, auth.token);
      setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const handleUpdateTodo = async () => {
    if (auth.token && editingId) {
      try {
        const updatedTodo = await updateTodo(editingId, { text: editingText, completed: false }, auth.token);
        setTodos(todos.map(todo => todo._id === editingId ? updatedTodo : todo));
        setEditingId(null);
        setEditingText('');
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <>
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Todo App
      </Typography>
      <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
    <Container>
      <h1>Todos</h1>
      <div style={{ margin: '20px 0' }}>
        <TextField
          label="New Todo"
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>
      <List>
        {todos.map(todo => (
          <ListItem key={todo._id}>
            {editingId === todo._id ? (
              <>
                <TextField
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  fullWidth
                />
                <IconButton edge="end" aria-label="save" onClick={handleUpdateTodo}>
                  <CheckIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary={todo.text} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(todo)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
    </>
  );
};

export default TodoPage;
