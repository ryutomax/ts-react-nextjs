"use client";

import { Dispatch, SetStateAction } from "react";
import { Todo } from '@/app/types/types';

type RemoveTodoProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todo: Todo;
  prevTodos: Todo[];
  sendMsgToParent : (message: string) => void;
}

export default function UpdateStatus({setTodos, todo, prevTodos, sendMsgToParent}: RemoveTodoProps) {

  const updateStatus = async (id: number) => {
    sendMsgToParent("");
    const storedTodos: Todo[] = prevTodos; //bk
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
      setTodos(storedTodos); //rollback
      console.error("Error update todos:", error);
    }
  };

  return(
    <button
      className={`button-status button mr-4 ${todo.completed ? "is-completed" : ""}`}
      style={{ color: todo.completed ? "white" : "#ffffff00" }}
      onClick={() => updateStatus(todo.id)}
    ></button>
  );
};