"use client";

import { useState, useContext, useEffect } from "react";
import useSWR from "swr";

import { Group, ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import { Alert } from "@/app/components/Common/SweetAlert";

import ModalWrapper from '@/app/components/Modal/ModalWrapper';
import LimitDateInput from '@/app/components/TodoAddArea/LimitDateInput';
import ModalButtons from '@/app/components/TodoAddArea/ModalButtons';
import TodoNameInput from '@/app/components/Modal/Update/TodoNameInput';
import GroupSelect from '@/app/components/Modal/Update/GroupSelect';

type ModalUpdateProps = {
  targetTodoName: string,
  targetTodoId: number,
  targetLimit: Date | null | undefined,
  targetGroupName: string,
  targetGroupId: number,
}

export default function ModalUpdate({targetTodoName, targetTodoId, targetLimit, targetGroupName, targetGroupId}: ModalUpdateProps) {
  const MC: ModalCtxtType = useContext(ModalCtxt);

  const [newName, setNewName] = useState<string>(targetTodoName);
  const [groupId, setGroupId] = useState<number>(1);
  const [limitDate, setLimitDate] = useState<string>("");
  const [limitHour, setLimitHour] = useState<string>("");
  const [limitMin, setLimitMin] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: groups = [], error } = useSWR<Group[]>("/api/groups?num=false", fetcher);

  if (error) {
    console.error("Error fetching groups:", error);
    return Alert("グループデータの取得に失敗しました。");
  }

  // 期限データセット
  useEffect(() => {
    if (targetLimit) {
      const date = new Date(targetLimit);
      setLimitDate(date.toISOString().split('T')[0]);
      setLimitHour(date.getHours().toString().padStart(2, '0'));
      setLimitMin(date.getMinutes().toString().padStart(2, '0'));
    }
  }, [targetLimit]);

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

  const execUpdate = () => {
    updateTodo(targetTodoId, newName, groupId, limitDate, limitHour, limitMin);
    MC.setTargetUpdate(null);
  };

  return (
    <ModalWrapper isOpen={true} onCancel={() => MC.setTargetUpdate(null)}>
      <TodoNameInput value={newName} onChange={setNewName} />
      <GroupSelect
        groups={groups}
        targetGroupId={targetGroupId}
        targetGroupName={targetGroupName}
        targetTodoId={targetTodoId}
        onChange={setGroupId}
      />
      <h2 className="modal-title mt-6">期限を変更</h2>
      <LimitDateInput
        limitDate={limitDate}
        limitHour={limitHour}
        limitMin={limitMin}
        onDateChange={setLimitDate}
        onHourChange={setLimitHour}
        onMinChange={setLimitMin}
      />
      <ModalButtons
        onCancel={() => MC.setTargetUpdate(null)}
        onAgree={execUpdate}
      />
    </ModalWrapper>
  );
}
