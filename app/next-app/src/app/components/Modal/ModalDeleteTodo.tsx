"use client";

import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import RemoveTodo from '@/app/components/Modal/RemoveTodo';

export default function ModalDeleteTodo() {

  const MC: ModalCtxtType = useContext(ModalCtxt);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => MC.setTargetTodoDelete(null)}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg border-2 border-white border-white border-solid"
        onClick={(e) => e.stopPropagation()}
      >
        <p>本当に削除しますか？</p>
        <div className="modal-buttons mt-8">
          <button onClick={() => MC.setTargetTodoDelete(null)} className="button-cancel button px-4 py-2 rounded">キャンセル</button>
          <RemoveTodo />
        </div>
      </div>
    </div>
  );
}
