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

  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);

  const addTodo = async () => {

    // 通常
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

  return (
    <div className="todo-inputArea">
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input"
      />
      <button className='button' onClick={addTodo}>追加</button>
    </div>
  );
}
