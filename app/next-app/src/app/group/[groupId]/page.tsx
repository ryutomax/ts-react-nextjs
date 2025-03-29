"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { pageTypeGroup } from "@/app/modules/contexts/context";
import { SkeletonTitle } from "@/app/components/Loading";

import TodoAddArea from '@/app/components/TodoAddArea'
import ListHeader from "@/app/components/ListHeader/ListHeader";
import List from "@/app/components/List/List";
import Modal from "@/app/components/Modal/Modal";

import { ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/contexts/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState"

export default function GroupPage() {
  const params = useParams();
  const groupId = Number(params.groupId);

  const TS = useTodoState();

  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    const fetchGroupTodos = async () => {
      try {
        const response = await fetch(`/api/groups/page?groupId=${Number(groupId)}`);
        
        if (!response.ok) throw new Error("Failed to fetch todos");
        
        const data = await response.json();

        setGroupName(data.groupName[0].name)
        TS.setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        TS.setIsLoading(false); // データ取得完了
      }
    };
    fetchGroupTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <pageTypeGroup.Provider value={groupId}>
      {TS.isLoading ? (
        <SkeletonTitle />
      ) : groupName.length !== 0 ? (
        <h2 className="todo-title">{groupName}</h2>
      ) : (
        <p className="">該当するタスクはありません</p>
      )}
      
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
      <TodoListCtxt.Provider value={{
        todos: TS.todos,
        isLoading: TS.isLoading,
        setTodos: TS.setTodos,
        setTargetTodo:  TS.setTargetTodo,
        setTargetTodoDelete:  TS.setTargetTodoDelete,
        setDraggingItem: TS.setDraggingItem,
        sendMsgToParent: TS.setChildMessage,
        draggingItem: TS.draggingItem
      }}>
        <List/>
      </TodoListCtxt.Provider>
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
    </pageTypeGroup.Provider>
  );
}