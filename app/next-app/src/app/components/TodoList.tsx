"use client";

import { useState, useEffect } from 'react';
import Modal from './Modal'
import Modal2 from './Modal2'
 
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export default function TodoList() {
  
  const [newTodoTitle, setNewTodo] = useState('');
  const [validMessage, setMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  //　
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
    try {
      setMessage("");
      if (newTodoTitle == "") {
        return setMessage("No Todo Name!!")
      }
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodoTitle }),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete todo');
  
      // フロントエンドの状態を更新（リロード不要）
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const statusTodo = async (id: number) => {
    try {

      // 楽観的更新: 先に UI を更新
      setTodos((prevTodos) =>
        prevTodos.map((targetTodo) =>
          targetTodo.id == id ? { ...targetTodo, completed: !targetTodo.completed } : targetTodo
        )
      );

      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      console.error("Error update todos:", error);
    }
  }

  // タイトルを更新する関数（楽観的更新）
  const updateTitle = async (id: number, newTitle: string) => {
    const prevTodos = [...todos]; // 失敗時のために元の状態を保存

    // 楽観的に更新
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );

    // API に PUT リクエスト
    const response = await fetch("/api/todos/title", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newTitle }),
    });

    // もし API 更新が失敗したらロールバック
    if (!response.ok) {
      alert("更新に失敗しました");
      setTodos(prevTodos);
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.completed ? '0.3' : '1' }}>
            <span>
              {todo.title}
            </span>
            <button style={{}} onClick={() => removeTodo(todo.id)}>DELETE</button>
            <button style={{}} onClick={() => statusTodo(todo.id)}>{todo.completed ? 'COMPLETE' : 'PROGRESS' }</button>
            <Modal targetId={todo.id} targetTitle={todo.title}/>
            <button
              onClick={() => setSelectedTodo(todo)}
              className="text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {selectedTodo && (
        <Modal2
          nowId={selectedTodo.id}
          nowTitle={selectedTodo.title}
          updateTitle={updateTitle}
          closeModal={() => setSelectedTodo(null)}
        />
      )}
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        style={{border : "1px solid white"}}
      />
      <button 
        className='font-bold' 
        onClick={addTodo} 
        style={{cursor: "pointer"}}
      >ADD</button>
      <p className='text-red-500'>{validMessage}</p>
    </div>
  );
}