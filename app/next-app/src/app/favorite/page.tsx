"use client";

import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect } from 'react';
import { Todo } from '@/app/types/types';

import TodoItem from "@/app/components/TodoItem";
import ModalUpdateName from '@/app/components/Modal/ModalUpdateName'
import ModalDeleteTodo from '@/app/components/Modal/ModalDeleteTodo'
import TodoAddArea from '@/app/components/TodoAddArea'
import CheckCompleted from '@/app/components/CheckCompleted'
import SearchTodo from "@/app/components/SearchTodo";

import { pageTypeFav } from "@/app/components/Context";

import { SkeletonList } from "@/app/components/Loading";
import DragOverlayItem from "@/app/components/SortableItem/DragOverlay";

export default function FavoritePage() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [targetTodoDelete, setTargetTodoDelete] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>("");
  const [isChecked, setCheckValue] = useState<boolean>(false);
  const [searchQuery, setQuery] = useState<string>(""); // 入力値

  const [draggingItem, setDraggingItem] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(true); // データ取得中かどうか

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const response = await fetch("/api/todos/favorite");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        setTodos(data);

      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false); // データ取得完了
      }
    };
    fetchFavs();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const draggedItem = todos.find((todo) => todo.id == event.active.id);
    setDraggingItem(draggedItem || null);
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

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <pageTypeFav.Provider value={true}>
      <h2 className="todo-title">重要</h2>
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
        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <ul className="todo-list space-y-2 p-4 border rounded-md">
              {isLoading ? (
                <SkeletonList />
              ) : todos.length !== 0 ? (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    todo={todo}
                    setTargetTodo={setTargetTodo}
                    setTargetTodoDelete={setTargetTodoDelete}
                    setTodos={setTodos}
                    prevTodos={[...todos]}
                    sendMsgToParent={handleChildReturnMsg}
                    setDraggingItem={setDraggingItem}
                  />
                ))
              ) : (
                <p className="">該当するタスクはありません</p>
              )}
            </ul>
          </SortableContext>
          <DragOverlayItem draggingItem={draggingItem}/>
        </DndContext>
      
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
    </pageTypeFav.Provider>
  );
}