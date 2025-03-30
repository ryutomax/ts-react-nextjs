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
    isLoading = useFetchHome();
  } else if(pageType == "fav") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    isLoading = useFetchFavs();
  } else if(pageType == "group") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading: groupLoading } = useFetchGroups();
    isLoading = groupLoading;
  }
  
  const handleChildReturnMsg = (message: string) => {
    TS.setChildMessage(message);
  };

  return (
    <ListHeaderCtxt.Provider value={{
      setTodos: TS.setTodos,
      setQuery: TS.setQuery,
      searchQuery: TS.searchQuery,
      isChecked: TS.isChecked,
      setCheckValue: TS.setCheckValue,
      sendMsgToParent: TS.setChildMessage,
    }}>
      <TodoListCtxt.Provider value={{
        todos: TS.todos,
        isLoading: isLoading,
        setTodos: TS.setTodos,
        setTargetTodo: TS.setTargetTodo,
        setTargetTodoDelete: TS.setTargetTodoDelete,
        setDraggingItem: TS.setDraggingItem,
        sendMsgToParent: TS.setChildMessage,
        draggingItem: TS.draggingItem,
      }}>
        <ModalCtxt.Provider value={{
          todos: TS.todos,
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
