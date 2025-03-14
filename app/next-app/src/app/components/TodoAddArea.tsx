"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Todo } from '../types/types';

type TodoAddAreaProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  sendMsgToParent: (message: string) => void;
}

export default function TodoAddArea({setTodos, sendMsgToParent}: TodoAddAreaProps) {

  const [newTodoTitle, setNewTodo] = useState('');

  const addTodo = async () => {
    try {
      sendMsgToParent("");

      if (newTodoTitle == "") {
        return sendMsgToParent("No Todo Name!!")
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

  return (
    <div className="todo-inputArea">
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input mr-4"
      />
      <button className='button' onClick={addTodo}>追加</button>
    </div>
  );
}
