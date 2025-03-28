"use client";

import { Dispatch, SetStateAction } from "react";
import { Todo } from '@/app/modules/types/types';

type RemoveTodoProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todo: Todo;
  sendMsgToParent : (message: string) => void;
  closeModal: () => void;
}

export default function RemoveTodo({setTodos, todo, closeModal, sendMsgToParent}: RemoveTodoProps) {

  const removeTodo = async (id: number) => {
    sendMsgToParent(""); // from parent
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete todo');
  
      // フロントエンドの状態を更新（リロード不要）
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      closeModal();
      
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };
  return(
    <button className="button-remove button ml-2" onClick={() => removeTodo(todo.id)}>削除</button>
  );
};