"use client";

import { Dispatch, SetStateAction } from "react";
import { Todo } from '@/app/types/types';
import RemoveTodo from '@/app/components/SortableItem/RemoveTodo';

type ModalProps = {
  todo: Todo;
  closeModal: () => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  sendMsgToParent: (message: string) => void;
};

export default function ModalDeleteTodo({ todo, closeModal, setTodos, sendMsgToParent }: ModalProps) {

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg border-2 border-white border-white border-solid"
        onClick={(e) => e.stopPropagation()}
      >
        <p>本当に削除しますか？</p>
        <div className="modal-buttons mt-8">
          <button onClick={closeModal} className="button-cancel button px-4 py-2 rounded">キャンセル</button>
          <RemoveTodo 
            setTodos={setTodos}
            todo={todo}
            sendMsgToParent={sendMsgToParent}
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
}
