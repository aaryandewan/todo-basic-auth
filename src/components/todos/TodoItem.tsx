// src/components/todos/TodoItem.tsx
import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface TodoItemProps {
  todo: { id: string; text: string; completed: boolean };
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <ListItem
      secondaryAction={
        <>
          {isEditing ? (
            <IconButton edge="end" aria-label="save" onClick={handleSave}>
              <CheckIcon />
            </IconButton>
          ) : (
            <>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          )}
        </>
      }
    >
      {isEditing ? (
        <TextField
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          fullWidth
        />
      ) : (
        <ListItemText primary={todo.text} />
      )}
    </ListItem>
  );
};
