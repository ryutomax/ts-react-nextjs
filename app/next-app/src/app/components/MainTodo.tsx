import { ReactNode } from "react";
import { pageTypeGroup, pageTypeFav, ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/hooks/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState";
import { Todo } from '@/app/modules/types/types';

import ListHeader from "@/app/components/ListHeader/ListHeader";
import List from "@/app/components/List/TodoList";
import Modal from "@/app/components/Modal/Modal";
import TodoAddArea from "@/app/components/TodoAddArea";

type MainTodoProps = {
  children: ReactNode;
  todos: Todo[];
  groupId?: number;
  isFavorite?: boolean;
  isLoading: boolean;
}

export const MainTodo = ({ children, todos, groupId, isFavorite, isLoading }: MainTodoProps) => {
  const TS = useTodoState();

  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message);
  };

  const ProviderWrapper = (
    groupId ? (
      <pageTypeGroup.Provider value={groupId}>{children}</pageTypeGroup.Provider>
    ) : isFavorite ? (
      <pageTypeFav.Provider value={true}>{children}</pageTypeFav.Provider>
    ) : (
      <>{children}</>
    )
  );

  return (
    <ListHeaderCtxt.Provider value={{
      setTodos: TS.setTodos,
      setQuery: TS.setQuery,
      searchQuery: TS.searchQuery,
      isChecked: TS.isChecked,
      setCheckValue: TS.setCheckValue,
      sendMsgToParent: TS.setChildMessage,
    }}>
      {ProviderWrapper}
      <TodoListCtxt.Provider value={{
        todos: todos,
        isLoading: isLoading,
        setTodos: TS.setTodos,
        setTargetTodo: TS.setTargetTodo,
        setTargetTodoDelete: TS.setTargetTodoDelete,
        setDraggingItem: TS.setDraggingItem,
        sendMsgToParent: TS.setChildMessage,
        draggingItem: TS.draggingItem,
      }}>
        <ModalCtxt.Provider value={{
          todos: todos,
          targetTodo: TS.targetTodo,
          targetTodoDelete: TS.targetTodoDelete,
          setTodos: TS.setTodos,
          setTargetTodo: TS.setTargetTodo,
          setTargetTodoDelete: TS.setTargetTodoDelete,
          sendMsgToParent: TS.setChildMessage,
        }}>
          <ListHeader />
          <List />
          <Modal />
          <TodoAddArea setTodos={TS.setTodos} sendMsgToParent={handleChildReturnMsg} />
          
          <p className="text-red-500">{TS.sysMassage}</p>
        </ModalCtxt.Provider>
      </TodoListCtxt.Provider>
    </ListHeaderCtxt.Provider>
  );
};
