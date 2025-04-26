"use client";

import { Dispatch, SetStateAction, useContext } from "react";
import { Todo } from '@/app/modules/types/types';
import { pageTypeFav, pageTypeGroup } from "@/app/modules/hooks/context";
import { CreateCondition } from '@/app/modules/types/types';
import { Alert } from "@/app/components/Common/SweetAlert";
import { useTodoAddAreaState } from "@/app/modules/hooks/useTodoState";
import ModalLimitDate from "@/app/components/TodoAddArea/ModalLimitDate";
import LimitDateDisplay from "@/app/components/TodoAddArea/LimitDateDisplay";

type TodoAddAreaProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoAddArea({setTodos}: TodoAddAreaProps) {
  const TA = useTodoAddAreaState();

  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);

  const addTodo = async () => {
    if (TA.newTodoName == "") {
      return Alert("タスク名を入力してください!!");
    }
    
    if (!TA.limitDate) {
      return Alert("期限入力時の日付入力は必須です!!");
    }

    if (TA.limitDate && !TA.limitHour && TA.limitMin) {
      return Alert("期限入力時の時刻入力は必須です!!");
    }

    let limitDateTime: Date | null = null;
    const [year, month, day] = TA.limitDate.split('-').map(Number);
    const hour = TA.limitHour ? parseInt(TA.limitHour) : parseInt("00");
    const minute = TA.limitMin ? parseInt(TA.limitMin) : parseInt("00");
    limitDateTime = new Date(year, month - 1, day, hour, minute);

    const createCondition: CreateCondition = {
      name: TA.newTodoName,
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
      TA.setNewTodo("");
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
    TA.setLimitDate(date);
    TA.setLimitHour(hour);
    TA.setLimitMin(minute);
    TA.setLimitModal(false);
  };

  const handleLimitDateReset = () => {
    TA.setLimitModal(false);
    TA.setLimitDate('');
    TA.setLimitHour('');
    TA.setLimitMin('');
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={TA.newTodoName}
        onChange={(e) => TA.setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input-name"
      />

      <LimitDateDisplay
        newTodoName={TA.newTodoName}
        limitDate={TA.limitDate}
        limitHour={TA.limitHour}
        limitMin={TA.limitMin}
      />
      
      {TA.newTodoName !== "" && (
        <button 
          className="button-limit"
          onClick={() => TA.setLimitModal(true)}
        />
      )}

      <ModalLimitDate
        isOpen={TA.limitModal}
        limitDate={TA.limitDate}
        limitHour={TA.limitHour}
        limitMin={TA.limitMin}
        onDateChange={TA.setLimitDate}
        onHourChange={TA.setLimitHour}
        onMinChange={TA.setLimitMin}
        onConfirm={handleLimitDateConfirm}
        onCancel={handleLimitDateReset}
      />

      <button className='button' onClick={addTodo}>
        追加
      </button>
    </div>
  );
}