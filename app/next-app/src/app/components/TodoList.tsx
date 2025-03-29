"use client";

import TodoAddArea from '@/app/components/TodoAddArea'
import ListHeader from "@/app/components/ListHeader/ListHeader";
import List from "@/app/components/List/List";
import Modal from "@/app/components/Modal/Modal";

import { ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/hooks/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState"
import { useFetchHome } from "@/app/modules/hooks/customSWR"

export default function TodoList() {
  const TS = useTodoState();
  const isLoading = useFetchHome();

  // 子コンポーネント経由のメッセージ操作
  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message); // 子から受け取ったメッセージを更新
  }

  return (
    <>
      <h2 className="todo-title">Home</h2>
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
        isLoading: isLoading,
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
        todos: TS.todos,
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
    </>
  );
}