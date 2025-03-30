import { ListHeaderCtxt, TodoListCtxt, ModalCtxt } from "@/app/modules/hooks/context";
import { useTodoState } from "@/app/modules/hooks/useTodoState";
import { useFetchHome, useFetchFavs, useFetchGroups } from "@/app/modules/hooks/customSWR"

import ListHeader from "@/app/components/ListHeader/ListHeader";
import List from "@/app/components/List/TodoList";
import Modal from "@/app/components/Modal/Modal";
import TodoAddArea from "@/app/components/TodoAddArea";

type MainTodoProps = {
  pageType: string;
}

export default function MainTodo({ pageType }: MainTodoProps) {
  const TS = useTodoState();

  let isLoading: boolean = false;
  
  if(pageType == "home"){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading: nowloading, isValidating } = useFetchHome();
    isLoading = nowloading || isValidating;
  } else if(pageType == "fav") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading: nowloading, isValidating } = useFetchFavs();
    isLoading = nowloading || isValidating;
  } else if(pageType == "group") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading: nowloading, isValidating } = useFetchGroups();
    isLoading = nowloading || isValidating;
  }

  return (
    <ListHeaderCtxt.Provider value={{
      setTodos: TS.setTodos,
      setQuery: TS.setQuery,
      searchQuery: TS.searchQuery,
      isChecked: TS.isChecked,
      setCheckValue: TS.setCheckValue
    }}>
      <TodoListCtxt.Provider value={{
        todos: TS.todos,
        isLoading: isLoading,
        setTodos: TS.setTodos,
        setTargetTodo: TS.setTargetTodo,
        setTargetTodoDelete: TS.setTargetTodoDelete,
        setDraggingItem: TS.setDraggingItem,
        draggingItem: TS.draggingItem,
      }}>
        <ModalCtxt.Provider value={{
          todos: TS.todos,
          targetTodo: TS.targetTodo,
          targetTodoDelete: TS.targetTodoDelete,
          setTodos: TS.setTodos,
          setTargetTodo: TS.setTargetTodo,
          setTargetTodoDelete: TS.setTargetTodoDelete
        }}>
          <ListHeader />
          <List />
          <Modal />
          <TodoAddArea setTodos={TS.setTodos} />
          
          <p className="text-red-500">{TS.sysMassage}</p>
        </ModalCtxt.Provider>
      </TodoListCtxt.Provider>
    </ListHeaderCtxt.Provider>
  );
};
