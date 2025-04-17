"use client";

import { Dispatch, SetStateAction } from "react";
import { Todo } from '@/app/modules/types/types';

type RemoveTodoProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todo: Todo;
  prevTodos: Todo[];
}

export default function UpdateStatus({setTodos, todo, prevTodos}: RemoveTodoProps) {

  const updateStatus = async (id: number) => {
    const storedTodos: Todo[] = prevTodos; //bk
    try {
      // 楽観的更新: 先に UI を更新
      setTodos((prevTodos) =>
        prevTodos.map((targetUpdate) =>
          targetUpdate.id == id ? { ...targetUpdate, completed: !targetUpdate.completed } : targetUpdate
        )
      );
      const response = await fetch('/api/todos/status', {
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
      className={`button-status mr-4 ${todo.completed ? "is-completed" : ""}`}
      style={{ color: todo.completed ? "white" : "#ffffff00" }}
      onClick={() => updateStatus(todo.id)}
    ></button>
  );
};