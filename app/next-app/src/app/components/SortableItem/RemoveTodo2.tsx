"use client";

import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/contexts/context";

export default function RemoveTodo() {

  const MC: ModalCtxtType = useContext(ModalCtxt);

  const removeTodo = async (id: number) => {
    MC.sendMsgToParent(""); // from parent
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete todo');
  
      // フロントエンドの状態を更新（リロード不要）
      MC.setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      MC.setTargetTodoDelete(null);
      
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };
  return(
    <button className="button-remove button ml-2" onClick={() => {if(MC.targetTodoDelete) removeTodo(MC.targetTodoDelete.id)}}>削除</button>
  );
};