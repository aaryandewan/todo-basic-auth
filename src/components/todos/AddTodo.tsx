// src/components/todos/AddTodo.tsx
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <TextField
        label="New Todo"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};
