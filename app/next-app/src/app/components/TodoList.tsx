"use client";

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from 'react';

import TodoItem from "@/app/components/TodoItem";
import ModalUpdateName from '@/app/components/Modal/ModalUpdateName'
import ModalDeleteTodo from '@/app/components/Modal/ModalDeleteTodo'
import TodoAddArea from '@/app/components/TodoAddArea'
import ListHeader from "@/app/components/ListHeader/ListHeader";

import { SkeletonList } from '@/app/components/Loading';
import DragOverlayItem from "@/app/components/SortableItem/DragOverlay";
import { handleDragStart, handleDragEnd } from '@/app/modules/functions/dnd';

import { ListHeaderCtxt } from "@/app/modules/contexts/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState"

export default function TodoList() {
  const TS = useTodoState();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        TS.setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        TS.setIsLoading(false); // データ取得完了
      }
    };
    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <>
      <h2 className="todo-title">Home</h2>
      <ListHeaderCtxt.Provider
        value={{
          setTodos: TS.setTodos,
          setQuery: TS.setQuery,
          searchQuery: TS.searchQuery,
          isChecked: TS.isChecked,
          setCheckValue: TS.setCheckValue,
          sendMsgToParent: TS.setChildMessage,
        }}
      >
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
      {TS.targetTodo && (
        <ModalUpdateName
          nowId={TS.targetTodo.id}
          nowName={TS.targetTodo.name}
          closeModal={() => TS.setTargetTodo(null)}
          prevTodos={[...TS.todos]}
          setTodos={TS.setTodos}
          sendMsgToParent={handleChildReturnMsg}
        />
      )}

      {TS.targetTodoDelete && (
        <ModalDeleteTodo
          todo={TS.targetTodoDelete}
          closeModal={() => TS.setTargetTodoDelete(null)}
          setTodos={TS.setTodos}
          sendMsgToParent={handleChildReturnMsg}
        />
      )}
      <TodoAddArea setTodos={TS.setTodos} sendMsgToParent={handleChildReturnMsg} />
      <p className='text-red-500'>{TS.sysMassage}</p>    
    </>
  );
}