"use client";

import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";

export default function RemoveTodo() {

  const MC: ModalCtxtType = useContext(ModalCtxt);

  const removeTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete todo');
  
      // フロントエンドの状態を更新（リロード不要）
      MC.setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      MC.setTargetDelete(null);
      
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };
  return(
    <button className="button-delete button ml-2" onClick={() => {if(MC.targetDelete) removeTodo(MC.targetDelete.id)}}>削除</button>
  );
};