"use client";

import { Dispatch, SetStateAction, useState, useContext } from "react";
import { Todo } from '@/app/modules/types/types';
import { pageTypeFav, pageTypeGroup } from "@/app/modules/hooks/context";
import { CreateCondition } from '@/app/modules/types/types';
import { Alert } from "@/app/components/SweetAlert";
import LimitDateModal from "@/app/components/TodoAddArea/LimitDateModal";
import LimitDateDisplay from "@/app/components/TodoAddArea/LimitDateDisplay";

type TodoAddAreaProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoAddArea({setTodos}: TodoAddAreaProps) {
  const [newTodoName, setNewTodo] = useState<string>('');
  const [limitDate, setLimitDate] = useState<string>('');
  const [limitHour, setLimitHour] = useState<string>('');
  const [limitMin, setLimitMin] = useState<string>('');
  const [limitModal, setLimitModal] = useState<boolean>(false);

  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);

  const addTodo = async () => {
    if (newTodoName == "") {
      return Alert("タスク名を入力してください!!");
    }
    
    if (!limitDate) {
      return Alert("期限入力時の日付入力は必須です!!");
    }

    if (limitDate && !limitHour && limitMin) {
      return Alert("期限入力時の時刻入力は必須です!!");
    }

    let limitDateTime: Date | null = null;
    const [year, month, day] = limitDate.split('-').map(Number);
    const hour = limitHour ? parseInt(limitHour) : parseInt("00");
    const minute = limitMin ? parseInt(limitMin) : parseInt("00");
    limitDateTime = new Date(year, month - 1, day, hour, minute);

    const createCondition: CreateCondition = {
      name: newTodoName,
      completed: false,
      favorite: valueFav,
      groupId: valueGroup !== 1 ? valueGroup : 1,
      limitDate: limitDateTime,
    };

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createCondition),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo("");
      handleLimitDateReset();

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const handleLimitDateConfirm = (date: string, hour: string, minute: string) => {
    // 日付が未入力
    if (!date) {
      return Alert("期限入力時の日付入力は必須です!!");
    }
    // hourのみ未入力
    if (date && !hour && minute) {
      return Alert("期限入力時の時刻入力は必須です!!");
    }
    setLimitDate(date);
    setLimitHour(hour);
    setLimitMin(minute);
    setLimitModal(false);
  };

  const handleLimitDateReset = () => {
    setLimitModal(false);
    setLimitDate('');
    setLimitHour('');
    setLimitMin('');
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input-name"
      />

      <LimitDateDisplay
        newTodoName={newTodoName}
        limitDate={limitDate}
        limitHour={limitHour}
        limitMin={limitMin}
      />
      
      {newTodoName !== "" && (
        <button 
          className="button-limit"
          onClick={() => setLimitModal(true)}
        />
      )}

      <LimitDateModal
        isOpen={limitModal}
        limitDate={limitDate}
        limitHour={limitHour}
        limitMin={limitMin}
        onDateChange={setLimitDate}
        onHourChange={setLimitHour}
        onMinChange={setLimitMin}
        onConfirm={handleLimitDateConfirm}
        onCancel={handleLimitDateReset}
      />

      <button className='button' onClick={addTodo}>
        追加
      </button>
    </div>
  );
}