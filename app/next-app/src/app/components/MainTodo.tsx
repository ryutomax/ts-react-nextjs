import { ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/hooks/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState";
import { useFetchTodos } from "@/app/modules/hooks/customSWR"

import ListHeader from "@/app/components/ListHeader/ListHeader";
import TodoList from "@/app/components/List/TodoList";
import Modal from "@/app/components/Modal/Modal";
import TodoAddArea from "@/app/components/TodoAddArea";
import { Todo } from "@/app/modules/types/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type MainTodoProps = {
  pageType: string;
}

export default function MainTodo({ pageType }: MainTodoProps) {
  const TS = useTodoState();
  const params = useParams();
  let routingPath: string = "";

  if(pageType == "home"){
    routingPath = "/api/todos";
  } else if(pageType == "fav") {
    routingPath = "/api/todos/favorite";
  } else if(pageType == "group") {
    const groupId = Number(params.groupId);
    routingPath = `/api/groups/page?groupId=${Number(groupId)}`
  }

  let isLoading: boolean = true;
  const { isLoading: nowloading, isValidating } = useFetchTodos(routingPath);

  // TS.todos = data ?? [];
  isLoading = nowloading || isValidating;

  useEffect(() => {
    console.log("Updated todos:", TS.todos);
  }, [TS.todos]);

  return (
    <>
      <ListHeaderCtxt.Provider value={{
        setTodos: TS.setTodos,
        setQuery: TS.setQuery,
        searchQuery: TS.searchQuery,
        isChecked: TS.isChecked,
        setCheckValue: TS.setCheckValue
      }}><ListHeader /></ListHeaderCtxt.Provider>
      <TodoListCtxt.Provider value={{
        todos: TS.todos,
        isLoading: isLoading,
        setTodos: TS.setTodos,
        setTargetTodo: TS.setTargetTodo,
        setTargetTodoDelete: TS.setTargetTodoDelete,
        setDraggingItem: TS.setDraggingItem,
        draggingItem: TS.draggingItem,
      }}><TodoList /></TodoListCtxt.Provider>
      <ModalCtxt.Provider value={{
        todos: TS.todos,
        targetTodo: TS.targetTodo,
        targetTodoDelete: TS.targetTodoDelete,
        setTodos: TS.setTodos,
        setTargetTodo: TS.setTargetTodo,
        setTargetTodoDelete: TS.setTargetTodoDelete
      }}><Modal /></ModalCtxt.Provider>
      <TodoAddArea setTodos={TS.setTodos} />
    </>
  );
};
