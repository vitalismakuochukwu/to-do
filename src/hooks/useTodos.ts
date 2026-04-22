import { useState, useEffect } from 'react';
import type { Todo } from '../types/Todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('react-todos');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    const newTodo: Todo = {
      ...todo,
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: string, updatedFields: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              fulfillment: !todo.completed ? 100 : (todo.fulfillment === 100 ? 0 : todo.fulfillment),
            }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
};