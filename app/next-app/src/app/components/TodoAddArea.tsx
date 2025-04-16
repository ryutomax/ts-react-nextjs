"use client";

import { Dispatch, SetStateAction, useState, useContext } from "react";
import { Todo } from '@/app/modules/types/types';
import { pageTypeFav, pageTypeGroup } from "@/app/modules/hooks/context";
import { CreateCondition } from '@/app/modules/types/types';
import { Alert } from "@/app/components/SweetAlert";

type TodoAddAreaProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoAddArea({setTodos}: TodoAddAreaProps) {
  const [newTodoName, setNewTodo] = useState<string>('');
  const [limitDate, setLimitDate] = useState<string>('');
  const [limitHour, setLimitHour] = useState<string >('');
  const [limitMin, setLimitMin] = useState<string>('');
  const [limitModal, setLimitModal] = useState<boolean>(false);

  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);

  // 新しいTodoを追加
  const addTodo = async () => {
    // 通常
    console.log(limitDate)
    console.log(limitHour)
    console.log(limitMin)
    const createCondition: CreateCondition = {
      name: newTodoName,
      completed: false,
      favorite: false, 
      groupId: 1
    };
    // タスクグループ指定
    createCondition.groupId = valueGroup != 1 ? Number(valueGroup) : createCondition.groupId;
    // 重要指定
    createCondition.favorite = valueFav;

    try {
      if (newTodoName == "") {
        return Alert("タスク名を入力してください!!");
      }
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createCondition),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const addTodoLimit = (date: string, hour: string, minute: string) => {
    setLimitDate(date);
    setLimitDate(hour);
    setLimitDate(minute);
    setLimitModal(false);
  } 

  return (
    <div className="todo-input">
      {limitDate} {limitHour}:{limitMin}
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input-name"
      />
      {/* 入力があったら */}
      {newTodoName != "" && (
        <button className="button-limit"
          onClick={() => setLimitModal(true)}
        ></button>
      )}
      {/* クリックされたら */}
      {limitModal && (
        <div 
        className="modal modal-limit inset-0"
        onClick={() => setLimitModal(false)}
        >
          <div
            className="modal-window todo-input-limit"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="modal-title">期限を選択してください。</p>
            <input type="date" value={limitDate} onChange={(e) => setLimitDate(e.target.value)} />
            <select
              name="hour" id="hour" className="todo-input-time"
              value={limitHour} onChange={(e) => setLimitHour(e.target.value)}
            >
              <option value="00">00</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            :
            <select
              name="minute" id="minute" className="todo-input-time"
              value={limitMin} onChange={(e) => setLimitMin(e.target.value)}
            >
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <button
              className="button"
              onClick={() => addTodoLimit(limitDate, limitHour, limitMin)}
            >決定</button>
          </div> 
        </div>
        
      )}
      <button className='button' onClick={addTodo}>追加</button>
    </div>
  );
}
