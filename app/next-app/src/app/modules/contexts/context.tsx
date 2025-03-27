import { createContext } from 'react';
import { ListHeaderCtxtType, TodoListCtxtType } from "@/app/modules/types/types";

export const pageTypeFav = createContext<boolean>(false);

export const pageTypeGroup = createContext<number>(1);

export const ListHeaderCtxt = createContext<ListHeaderCtxtType>({
  setTodos: () => {},
  setQuery: () => {},
  searchQuery: "",
  isChecked: false,
  setCheckValue: () => {},
  sendMsgToParent: () => {},
});

export const TodoListCtxt = createContext<TodoListCtxtType>({
  todos: [],
  isLoading: false,
  setTodos: () => {},
  setTargetTodo: () => {},
  setTargetTodoDelete: () => {},
  setDraggingItem: () => {},
  sendMsgToParent: () => {},
  draggingItem: () => {}
});