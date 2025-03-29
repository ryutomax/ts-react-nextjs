"use client";

import { useEffect } from 'react';

import TodoAddArea from '@/app/components/TodoAddArea'
import ListHeader from "@/app/components/ListHeader/ListHeader";
import List from "@/app/components/List/List";
import Modal from "@/app/components/Modal/Modal";

import { pageTypeFav, ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/contexts/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState"

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
    </pageTypeFav.Provider>
  );
}