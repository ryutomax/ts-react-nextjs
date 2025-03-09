import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  // createdAt: Date;
};

type Props = {
  todos: Todo[]
};

export default function Home({ todos }: Props) {
  
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async () => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo('');
    // ページをリロードして新しい TODO を表示
    window.location.reload();
  };

  const removeTodo = async (id: number) => {
    // const [prevTodos, setTodos] = useState('');
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), 
    });

    if (!response.ok) {
      console.error('Failed to delete todo');
      return;
    }
  
    window.location.reload();
    // フロントエンドの状態を更新（リロード不要）
    // setNewTodo((prevTodos) => prevTodos.filter((newTodo) => newTodo.id !== id));
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

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await prisma.todo.findMany();
  return { props: { todos } };
};