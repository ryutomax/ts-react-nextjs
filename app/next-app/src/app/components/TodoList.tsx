"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

import { useState, useEffect } from 'react';
import Modal from './Modal'
import TodoAddArea from './TodoAddArea'
import CheckCompleted from './CheckCompleted'
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

  const [searchTodoName, setSearchTodoName] = useState<string>("");

  const searchTodo = async(searchText: string) => {
    const response = await fetch('/api/todos/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: searchText }),
    });
    if (!response.ok) throw new Error('Failed to filtered todo');

    const searchedTodo = await response.json();
    setTodos(searchedTodo);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTodoName}
          onChange={(e) => setSearchTodoName(e.target.value)}
          placeholder="Search TODO"
          className="todo-input mr-4"
        />
        <button className='button' onClick={() => searchTodo(searchTodoName)}>検索</button>
      </div>
      <CheckCompleted 
        setTodos={setTodos}
        sendMsgToParent={handleChildReturnMsg}
      />
      {todos.length != 0 ? (
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
      ):(
        <div className="todo-list space-y-2 p-4 border rounded-md">
          <p className=''>該当するタスクはありません</p>
        </div>
      )}
      
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