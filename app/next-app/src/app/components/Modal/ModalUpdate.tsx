"use client";

import { useState, useContext, useEffect } from "react";

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
  const [limitDate, setLimitDate] = useState<string>("");
  const [limitHour, setLimitHour] = useState<string>("");
  const [limitMin, setLimitMin] = useState<string>("");

  // 期限データセット
  useEffect(() => {
    if (targetLimit) {
      const date = new Date(targetLimit);
      setLimitDate(date.toISOString().split('T')[0]);
      setLimitHour(date.getHours().toString().padStart(2, '0'));
      setLimitMin(date.getMinutes().toString().padStart(2, '0'));
    }
  }, [targetLimit]);

  const onDateChange = (value: string) => {
    setLimitDate(value);
  };

  const onHourChange = (value: string) => {
    setLimitHour(value);
  };

  const onMinChange = (value: string) => {
    setLimitMin(value);
  };

  const updateTodo = async (id: number, newName: string, groupId: number, limitDate: string, limitHour: string, limitMin: string) => {
    if (newName == "") {
      return Alert("タスク名を入力してください!!");
    }
    
    if (limitDate == "") {
      return Alert("期限入力時の日付入力は必須です!!");
    }

    if (limitDate == "" && limitHour != "" && limitMin == "") {
      return Alert("期限入力時の時刻入力は必須です!!");
    }

    let limitDateTime: Date | null = null;
    const [year, month, day] = limitDate.split('-').map(Number);
    const hour = limitHour ? parseInt(limitHour) : parseInt("00");
    const minute = limitMin ? parseInt(limitMin) : parseInt("00");
    limitDateTime = new Date(year, month - 1, day, hour, minute);

    try {
      // 楽観的に更新
      // MC.setTodos((prev) =>
      //   prev.map((todo) => (todo.id == id ? { ...todo, name: newName } : todo))
      // );

      // API に PUT リクエスト
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newName, groupId, limitDateTime }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

      if (targetTodoId != groupId) window.location.reload();

    } catch (error) {
      MC.setTodos([...MC.todos]); //rollback
      console.error("Error update todos:", error);
    }
  };

  // groupデータ取得関数
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
    updateTodo(targetTodoId, newName, groupId, limitDate, limitHour, limitMin);
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
        <h2 className="modal-title text-xl font-bold mt-6">グループを変更</h2>
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
        <h2 className="modal-title text-xl font-bold mt-6">期限を変更</h2>
        
        <input 
          type="date" 
          value={limitDate} 
          onChange={(e) => onDateChange(e.target.value)} 
        />
        
        <select
          name="hour"
          id="hour"
          className="todo-input-time"
          value={limitHour}
          onChange={(e) => onHourChange(e.target.value)}
        >
          <option value="">--</option>
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i.toString().padStart(2, '0')}>
              {i.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
        :
        <select
          name="minute"
          id="minute"
          className="todo-input-time"
          value={limitMin}
          onChange={(e) => onMinChange(e.target.value)}
        >
          <option value="">--</option>
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>

        <div className="modal-buttons mt-8">
          <button onClick={() => MC.setTargetUpdate(null)} className="button-cancel button px-4 py-2 rounded"></button>
          <button onClick={execUpdate} className="button-update button"></button>
        </div>
      </div>
    </div>
  );
}
