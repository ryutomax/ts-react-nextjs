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

  const handleUpdate = () => {
    updateTitle(nowId, newTitle);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-white border-white border-solid">
        <h2 className="text-xl font-bold">タイトルを編集</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">キャンセル</button>
          <button onClick={handleUpdate} className="bg-green-500 text-black px-4 py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
