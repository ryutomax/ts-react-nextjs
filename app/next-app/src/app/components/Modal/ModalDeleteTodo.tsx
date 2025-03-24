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
  // const [newName, setNewName] = useState(nowName);

  // const updateName = async (id: number, newName: string) => {
  //   sendMsgToParent("");
  //   // const prevTodos = prevTodos; // 失敗時のために元の状態を保存
  //   try {
  //     // 楽観的に更新
  //     setTodos((prev) =>
  //       prev.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo))
  //     );

  //     // API に PUT リクエスト
  //     const response = await fetch("/api/todos/name", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id, newName }),
  //     });
  //     if (!response.ok) throw new Error('Failed to update todo');

  //   } catch (error) {
  //     setTodos(prevTodos); //rollback
  //     console.error("Error update todos:", error);
  //   }
  // };

  // const execDelete = () => {
  //   updateName(nowId, newName);
  //   closeModal();
  // };

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
