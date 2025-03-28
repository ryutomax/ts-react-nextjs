"use client";

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from 'react';

import TodoItem from "@/app/components/TodoItem";
import TodoAddArea from '@/app/components/TodoAddArea'

import { ListHeaderCtxt, ModalCtxt, pageTypeFav } from "@/app/modules/contexts/context";

import { SkeletonList } from "@/app/components/Loading";
import DragOverlayItem from "@/app/components/SortableItem/DragOverlay";
import { handleDragStart, handleDragEnd } from '@/app/modules/functions/dnd';

import { useTodoState } from "@/app/modules/hooks/useTodoState"
import Modal from "@/app/components/Modal/Modal";
import ListHeader from "@/app/components/ListHeader/ListHeader";

export default function FavoritePage() {
  const TS = useTodoState();

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const response = await fetch("/api/todos/favorite");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        TS.setTodos(data);

      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        TS.setIsLoading(false); // データ取得完了
      }
    };
    fetchFavs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <pageTypeFav.Provider value={true}>
      <h2 className="todo-title">重要</h2>
      <ListHeaderCtxt.Provider value={{
          setTodos: TS.setTodos,
          setQuery: TS.setQuery,
          searchQuery: TS.searchQuery,
          isChecked: TS.isChecked,
          setCheckValue: TS.setCheckValue,
          sendMsgToParent: TS.setChildMessage,
      }}>
        <ListHeader/>
      </ListHeaderCtxt.Provider>
      <DndContext 
        collisionDetection={closestCenter} 
        onDragStart={(event) => handleDragStart(event, TS.todos, TS.setDraggingItem)} 
        onDragEnd={(event) => handleDragEnd(event, TS.todos, TS.setTodos)}
      >
        <SortableContext items={TS.todos} strategy={verticalListSortingStrategy}>
          <ul className="todo-list space-y-2 p-4 border rounded-md">
            {TS.isLoading ? (
              <SkeletonList />
            ) : TS.todos.length !== 0 ? (
              TS.todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo}
                  setTargetTodo={TS.setTargetTodo}
                  setTargetTodoDelete={TS.setTargetTodoDelete}
                  setTodos={TS.setTodos}
                  prevTodos={[...TS.todos]}
                  sendMsgToParent={handleChildReturnMsg}
                  setDraggingItem={TS.setDraggingItem}
                />
              ))
            ) : (
              <p className="">該当するタスクはありません</p>
            )}
          </ul>
        </SortableContext>
        <DragOverlayItem draggingItem={TS.draggingItem}/>
      </DndContext>
      <ModalCtxt.Provider value={{
        todos: [],
        targetTodo: TS.targetTodo,
        targetTodoDelete: TS.targetTodoDelete,
        setTodos: TS.setTodos,
        setTargetTodo:  TS.setTargetTodo,
        setTargetTodoDelete:  TS.setTargetTodoDelete,
        sendMsgToParent: TS.setChildMessage,
      }}>
        <Modal />
      </ModalCtxt.Provider>
      <TodoAddArea setTodos={TS.setTodos} sendMsgToParent={handleChildReturnMsg} />
      <p className='text-red-500'>{TS.sysMassage}</p>    
    </pageTypeFav.Provider>
  );
}