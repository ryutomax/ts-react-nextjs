"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

import { useState, useEffect } from 'react';
import Modal from './Modal'
import TodoAddArea from './TodoAddArea'
import { Todo } from '../types/types';

export default function TodoList() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const updateTitle = async (id: number, newTitle: string) => {
    setChildMessage("");
    const prevTodos = [...todos]; // 失敗時のために元の状態を保存
    try {
      // 楽観的に更新
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
      );

      // API に PUT リクエスト
      const response = await fetch("/api/todos/title", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newTitle }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      setTodos(prevTodos); //rollback
      console.error("Error update todos:", error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) throw new Error('error: over is null');

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  const handleChildReturnMsg = (message: string) => {
    setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  const handleCheckboxChange = async () => {
    try {
      const response = await fetch('/api/todos/filered', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true}),
      });
      if (!response.ok) throw new Error("Failed to fetch todos");


      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  return (
    <div>
      <input 
        type="checkbox" 
        value={""}
        // checked={}
        id="filterd-completed"
        onChange={() => handleCheckboxChange()}
      />
      <label htmlFor="filterd-completed">完了したタスクを非表示</label>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <ul className="todo-list space-y-2 p-4 border rounded-md">
            {todos.map((todo) => (
              <SortableItem 
                key={todo.id} 
                id={todo.id}
                todo={todo}
                setTargetTodo={setTargetTodo}
                setTodos={setTodos}
                prevTodos={[...todos]}
                sendMsgToParent={handleChildReturnMsg}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {targetTodo && (
        <Modal
          nowId={targetTodo.id}
          nowTitle={targetTodo.title}
          updateTitle={updateTitle}
          closeModal={() => setTargetTodo(null)}
        />
      )}
      <TodoAddArea setTodos={setTodos} sendMsgToParent={handleChildReturnMsg} />
      <p className='text-red-500'>{sysMassage}</p>
    </div>
  );
}