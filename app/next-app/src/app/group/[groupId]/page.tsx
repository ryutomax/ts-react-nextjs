"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useParams } from "next/navigation";
import { useState, useEffect, createContext } from 'react';
import { Todo } from '@/app/types/types';

import SortableItem from "@/app/components/TodoItem";
import ModalUpdateName from '@/app/components/modal/ModalUpdateName'
import ModalDeleteTodo from '@/app/components/modal/ModalDeleteTodo'
import TodoAddArea from '@/app/components/TodoAddArea'

export const pageTypeGroup = createContext<number>(1);

export default function GroupPage() {
  const params = useParams();
  const groupId = Number(params.groupId);

  const [groupName, setGroupName] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [targetTodoDelete, setTargetTodoDelete] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>("");

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
      }
    };
    fetchGroupTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <pageTypeGroup.Provider value={groupId}>
      <h2 className="todo-title">{groupName}</h2>
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
    </pageTypeGroup.Provider>
  );
}