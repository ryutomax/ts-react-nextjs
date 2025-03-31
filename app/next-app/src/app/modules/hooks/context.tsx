import { createContext } from 'react';
import { ListHeaderCtxtType, TodoListCtxtType, ModalCtxtType } from "@/app/modules/types/types";

export const pageTypeFav = createContext<boolean>(false);

export const pageTypeGroup = createContext<number>(1);

export const MainTodoCtxt = createContext<ListHeaderCtxtType>({
  setTodos: () => {},
  setQuery: () => {},
  searchQuery: "",
  isChecked: false,
  setCheckValue: () => {}
});

export const ListHeaderCtxt = createContext<ListHeaderCtxtType>({
  setTodos: () => {},
  setQuery: () => {},
  searchQuery: "",
  isChecked: false,
  setCheckValue: () => {}
});

export const TodoListCtxt = createContext<TodoListCtxtType>({
  todos: [],
  isLoading: false,
  setTodos: () => {},
  setTargetTodo: () => {},
  setTargetTodoDelete: () => {},
  setDraggingItem: () => {},
  draggingItem: null
});

export const ModalCtxt = createContext<ModalCtxtType>({
  todos: [],
  targetTodo: null,
  targetTodoDelete: null,
  setTodos: () => {},
  setTargetTodo:  () => {},
  setTargetTodoDelete:  () => {}
});