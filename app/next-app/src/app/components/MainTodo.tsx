import { ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/hooks/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState";

import ListHeader from "@/app/components/ListHeader/ListHeader";
import Modal from "@/app/components/Modal/Modal";
import TodoAddArea from "@/app/components/TodoAddArea";
import { Todo } from "@/app/modules/types/types";
import { useParams } from "next/navigation";
import useSWR from "swr";
import TodoList from "./List/TodoList";

type MainTodoProps = {
  pageType: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Todo[]>);
}
  
export default function MainTodo({ pageType }: MainTodoProps) {

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
  
  const TS = useTodoState();
  const { isValidating, isLoading } = useSWR(routingPath, fetcher, {
    revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
    onSuccess: (fetchedData) => {
      TS.setTodos(fetchedData);
    }
  });

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
        isLoading: isValidating || isLoading,
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
