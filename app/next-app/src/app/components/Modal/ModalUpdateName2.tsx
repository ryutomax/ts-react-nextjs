"use client";

import { useState, useContext } from "react";

import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/contexts/context";

type ModalUpdateNameProps = {
  targetTodoName: string,
  targetTodoId: number
}

export default function ModalUpdateName({targetTodoName, targetTodoId}: ModalUpdateNameProps) {
  const MC: ModalCtxtType = useContext(ModalCtxt);

  const [newName, setNewName] = useState<string>(targetTodoName);

  const updateName = async (id: number, newName: string ) => {
    MC.sendMsgToParent("");
    // const prevTodos = prevTodos; // 失敗時のために元の状態を保存
    try {
      // 楽観的に更新
      MC.setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo))
      );

      // API に PUT リクエスト
      const response = await fetch("/api/todos/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newName }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      MC.setTodos([...MC.todos]); //rollback
      console.error("Error update todos:", error);
    }
  };

  const execUpdate = () => {
    updateName(targetTodoId, targetTodoName);
    MC.setTargetTodoDelete(null);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => MC.setTargetTodo(null)}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg border-2 border-white border-white border-solid"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">タイトルを編集</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="modal-buttons mt-8">
          <button onClick={() => MC.setTargetTodo(null)} className="button-cancel button px-4 py-2 rounded">キャンセル</button>
          <button onClick={execUpdate} className="button-update button bg-green-500 text-black px-4 py-2 rounded">
            更新
          </button>
        </div>
      </div>
    </div>
  );
}
