"use client";

import { useState, useContext } from "react";

import { Group, ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import { Alert } from "@/app/components/SweetAlert";

type ModalUpdateProps = {
  targetTodoName: string,
  targetTodoId: number,
  targetLimit: Date | null | undefined,
}

export default function ModalUpdate({targetTodoName, targetTodoId, targetLimit}: ModalUpdateProps) {
  const MC: ModalCtxtType = useContext(ModalCtxt);

  const [newName, setNewName] = useState<string>(targetTodoName);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState<number>(1);

  const updateName = async (id: number, newName: string, groupId: number ) => {
    if (newName == "") {
      return Alert("タスク名を入力してください!!");
    }
    try {
      // 楽観的に更新
      MC.setTodos((prev) =>
        prev.map((todo) => (todo.id == id ? { ...todo, name: newName } : todo))
      );

      // API に PUT リクエスト
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newName, groupId }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

      if (targetTodoId != groupId) window.location.reload();

    } catch (error) {
      MC.setTodos([...MC.todos]); //rollback
      console.error("Error update todos:", error);
    }
  };

  // データ取得関数
  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/groups?num=false"); // APIエンドポイントに変更
      const data: Group[] = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("グループの取得に失敗しました", error);
    }
  };

  const execUpdate = () => {
    updateName(targetTodoId, newName, groupId);
    MC.setTargetUpdate(null);
  };

  return (
    <div 
      className="modal inset-0"
      onClick={() => MC.setTargetUpdate(null)}
    >
      <div
        className="modal-window p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title text-xl font-bold">タイトルを編集</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="modal-input"
        />
        <h2 className="modal-title text-xl font-bold mt-4">グループを変更</h2>
        <select
          className="modal-input"
          name="group"
          onFocus={fetchGroups} // フォーカス時にデータ取得
          onChange={(e) => setGroupId(Number(e.target.value))}
        >
          {groups.length === 0 ? (
            <option value={targetTodoId}>選択してください</option>
          ) : (
            <>
              <option value="1">ALL</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </>
            
          )}
        </select>
        {targetLimit && (
          <time dateTime={new Date(targetLimit).toISOString()}>
            {new Date(targetLimit).toISOString()}
          </time>
        )}
        

        <div className="modal-buttons mt-8">
          <button onClick={() => MC.setTargetUpdate(null)} className="button-cancel button px-4 py-2 rounded"></button>
          <button onClick={execUpdate} className="button-update button"></button>
        </div>
      </div>
    </div>
  );
}
