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
    if (newTodoName === "") {
      return Alert("タスク名を入力してください!!");
    }

    let limitDateTime: Date | null = null;
    if (limitDate && limitHour && limitMin) {
      const [year, month, day] = limitDate.split('-').map(Number);
      const hour = parseInt(limitHour);
      const minute = parseInt(limitMin);
      limitDateTime = new Date(year, month - 1, day, hour, minute);
    }

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
      setNewTodo('');
      setLimitDate('');
      setLimitHour('');
      setLimitMin('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const handleLimitDateConfirm = (date: string, hour: string, minute: string) => {
    setLimitDate(date);
    setLimitHour(hour);
    setLimitMin(minute);
    setLimitModal(false);
  };

  const handleLimitDateCancel = () => {
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
        onCancel={handleLimitDateCancel}
      />

      <button className='button' onClick={addTodo}>
        追加
      </button>
    </div>
  );
} 