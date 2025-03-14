"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

import { useState, useEffect } from 'react';
import Modal from './Modal'
import TodoAddArea from './TodoAddArea'
 
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export default function TodoList() {
  
  const [newTodoTitle, setNewTodo] = useState('');
  const [validMessage, setMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);

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

  const addTodo = async () => {
    try {
      setMessage("");
      if (newTodoTitle == "") {
        return setMessage("No Todo Name!!")
      }
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodoTitle }),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const removeTodo = async (id: number) => {
    setMessage("");
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete todo');
  
      // フロントエンドの状態を更新（リロード不要）
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const updateStatus = async (id: number) => {
    setMessage("");
    const prevTodos = [...todos]; // 失敗時のために元の状態を保存
    try {
      // 楽観的更新: 先に UI を更新
      setTodos((prevTodos) =>
        prevTodos.map((targetTodo) =>
          targetTodo.id == id ? { ...targetTodo, completed: !targetTodo.completed } : targetTodo
        )
      );
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      setTodos(prevTodos); //rollback
      console.error("Error update todos:", error);
    }
  }

  const updateTitle = async (id: number, newTitle: string) => {
    setMessage("");
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

  const handleDragEndDev = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) throw new Error('error: over is null');

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEndDev}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <ul className="todo-list space-y-2 p-4 border rounded-md">
            {todos.map((todo) => (
              <SortableItem 
                key={todo.id} 
                id={todo.id}
                todo={todo}
                updateStatus={updateStatus}
                removeTodo={removeTodo}
                setTargetTodo={setTargetTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      { targetTodo && (
        <Modal
          nowId={targetTodo.id}
          nowTitle={targetTodo.title}
          updateTitle={updateTitle}
          closeModal={() => setTargetTodo(null)}
        />
      )}
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New TODO"
        className="todo-input mr-4"
      />
      <button 
        className='font-bold' 
        onClick={addTodo} 
        style={{cursor: "pointer"}}
      >追加</button>
      <p className='text-red-500'>{validMessage}</p>


      {/* <TodoAddArea 
        setTodos={setTodos}
        setNewTodo={setNewTodo}
      /> */}
    </div>
  );
}