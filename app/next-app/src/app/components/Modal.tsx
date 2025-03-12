"use client";

import { useState } from "react";

type ModalProps = {
  targetId : number;
  targetTitle : string;
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateTitle, setTodoTitle] = useState(props.targetTitle);

  const updateTodoTitle = async (id : number, updateTitle : string) => {
    try {
      const response = await fetch('/api/todos/title', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id , updateTitle}), 
      });
      if (!response.ok) throw new Error('Failed to update todo');

      setIsOpen(false);

    } catch(error) {
      console.error("Error update todos:", error);
    }
  }

  return (
    <>
      {/* モーダルを開くボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white px-4 py-2 rounded"
      >EDIT</button>

      {/* モーダル */}
      {isOpen && (
        <div
          className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)} // 背景クリックで閉じる
        >
          {/* モーダル本体 */}
          <div
            className="border-2 border-white border-white border-solid p-6 rounded-lg shadow-lg border-white"
            onClick={(e) => e.stopPropagation()} // モーダル内クリックでは閉じない
          >
            <h2 className="text-xl font-bold">モーダルタイトル</h2>
            <p>モーダルの内容です。</p>

            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="TODO Title"
              style={{border : "1px solid white"}}
            />
            <button
              onClick={() => updateTodoTitle(props.targetId, updateTitle)}
              className="mt-4 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}