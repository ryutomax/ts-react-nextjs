"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Todo } from '../types/types';

type ModalProps = {
  nowId: number;
  nowTitle: string;
  prevTodos: Todo[];
  // updateTitle: (id: number, newTitle: string) => void;
  closeModal: () => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  sendMsgToParent: (message: string) => void;
};

export default function Modal({ nowId, nowTitle, prevTodos, closeModal, setTodos, sendMsgToParent }: ModalProps) {
  const [newTitle, setNewTitle] = useState(nowTitle);

  const updateTitle = async (id: number, newTitle: string) => {
    sendMsgToParent("");
    // const prevTodos = prevTodos; // 失敗時のために元の状態を保存
    try {
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
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      setTodos(prevTodos); //rollback
      console.error("Error update todos:", error);
    }
  };

  const execUpdate = () => {
    updateTitle(nowId, newTitle);
    closeModal();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg border-2 border-white border-white border-solid"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">タイトルを編集</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="modal-buttons mt-8">
          <button onClick={closeModal} className="button-cancel button px-4 py-2 rounded">キャンセル</button>
          <button onClick={execUpdate} className="button-update button bg-green-500 text-black px-4 py-2 rounded">
            更新
          </button>
        </div>
      </div>
    </div>
  );
}
