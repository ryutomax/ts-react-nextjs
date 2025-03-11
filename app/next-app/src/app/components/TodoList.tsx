"use client";

import { useState, useEffect } from 'react';
 
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export default function TodoList() {
  
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });

    if (!response.ok) {
      console.error('Failed to add todo');
      return;
    }
  
    const addedTodo = await response.json();
  
    // フロントエンドの状態を更新（リロード不要）
    setTodos((prevTodos) => [...prevTodos, addedTodo]);
    setNewTodo('');
  };

  const removeTodo = async (id: number) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), 
    });

    if (!response.ok) {
      console.error('Failed to delete todo');
      return;
    }

    // フロントエンドの状態を更新（リロード不要）
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => removeTodo(todo.id)}>DELETE</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}