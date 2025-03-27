"use client";

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Todo } from '@/app/modules/types/types';

import TodoItem from "@/app/components/TodoItem";
import ModalUpdateName from '@/app/components/Modal/ModalUpdateName'
import ModalDeleteTodo from '@/app/components/Modal/ModalDeleteTodo'
import TodoAddArea from '@/app/components/TodoAddArea'
import CheckCompleted from '@/app/components/CheckCompleted'
import SearchTodo from "@/app/components/SearchTodo";

import { pageTypeGroup } from "@/app/modules/contexts/context";

import { SkeletonList, SkeletonTitle } from "@/app/components/Loading";
import DragOverlayItem from "@/app/components/SortableItem/DragOverlay";
import { handleDragStart, handleDragEnd } from '@/app/modules/functions/dnd';

export default function GroupPage() {
  const params = useParams();
  const groupId = Number(params.groupId);

  const [groupName, setGroupName] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [targetTodoDelete, setTargetTodoDelete] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>("");
  const [isChecked, setCheckValue] = useState<boolean>(false);
  const [searchQuery, setQuery] = useState<string>(""); // 入力値
  const [draggingItem, setDraggingItem] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(true); // データ取得中かどうか

  useEffect(() => {
    const fetchGroupTodos = async () => {
      try {
        const response = await fetch(`/api/groups/page?groupId=${Number(groupId)}`);
        
        if (!response.ok) throw new Error("Failed to fetch todos");
        
        const data = await response.json();

        setGroupName(data.groupName[0].name)
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false); // データ取得完了
      }
    };
    fetchGroupTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <pageTypeGroup.Provider value={groupId}>
      {isLoading ? (
        <SkeletonTitle />
      ) : groupName.length !== 0 ? (
        <h2 className="todo-title">{groupName}</h2>
      ) : (
        <p className="">該当するタスクはありません</p>
      )}
      
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
      <DndContext 
        collisionDetection={closestCenter} 
        onDragStart={(event) => handleDragStart(event, todos, setDraggingItem)} 
        onDragEnd={(event) => handleDragEnd(event, todos, setTodos)}
      >
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
    </pageTypeGroup.Provider>
  );
}