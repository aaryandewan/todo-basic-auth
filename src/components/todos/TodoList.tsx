// src/components/todos/TodoList.tsx
import React from 'react';
import { List } from '@mui/material';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Array<{ id: string; text: string; completed: boolean; }>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </List>
  );
};
