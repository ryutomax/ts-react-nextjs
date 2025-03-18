"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "@/app/components/SortableItem";

import { useState, useEffect } from 'react';
import ModalUpdateName from '@/app/components/ModalUpdateName'
import ModalDeleteTodo from '@/app/components/ModalDeleteTodo'
import TodoAddArea from '@/app/components/TodoAddArea'
import CheckCompleted from '@/app/components/CheckCompleted'
import { Todo } from '@/app/types/types';
import SearchTodo from "@/app/components/SearchTodo";

export default function TodoList() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [targetTodoDelete, setTargetTodoDelete] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>("");
  const [isChecked, setCheckValue] = useState<boolean>(false);
  const [searchQuery, setQuery] = useState<string>(""); // 入力値

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) throw new Error('error: over is null');

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id);
      const newIndex = todos.findIndex(todo => todo.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <>
      <SearchTodo 
        setTodos={setTodos}
        setQuery={setQuery}
        searchQuery={searchQuery}
        isChecked={isChecked}
      />
      <CheckCompleted 
        setTodos={setTodos}
        setCheckValue={setCheckValue}
        searchQuery={searchQuery}
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
                  setTargetTodoDelete={setTargetTodoDelete}
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
        <ModalUpdateName
          nowId={targetTodo.id}
          nowName={targetTodo.name}
          closeModal={() => setTargetTodo(null)}
          prevTodos={[...todos]}
          setTodos={setTodos}
          sendMsgToParent={handleChildReturnMsg}
        />
      )}

      {targetTodoDelete && (
        <ModalDeleteTodo
          todo={targetTodoDelete}
          closeModal={() => setTargetTodoDelete(null)}
          setTodos={setTodos}
          sendMsgToParent={handleChildReturnMsg}
        />
      )}
      <TodoAddArea setTodos={setTodos} sendMsgToParent={handleChildReturnMsg} />
      <p className='text-red-500'>{sysMassage}</p>    
    </>
  );
}