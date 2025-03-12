"use client";

import { useState } from "react";

type ModalProps = {
  nowId: number;
  nowTitle: string;
  updateTitle: (id: number, newTitle: string) => void;
  closeModal: () => void;
};

export default function Modal({ nowId, nowTitle, updateTitle, closeModal }: ModalProps) {
  const [newTitle, setNewTitle] = useState(nowTitle);

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
