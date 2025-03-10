"use client";

import { useState, useEffect } from 'react';
// import { GetServerSideProps } from 'next';
// import { prisma } from '../lib/prisma';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  // createdAt: Date;
};

export default function Home() {
  
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        console.error("Failed to fetch todos");
        return;
      }
      const data = await response.json();
      setTodos(data);
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
      <h1>TODO List</h1>
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