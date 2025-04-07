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
  isLoading: true,
  setTodos: () => {},
  setTargetTodo: () => {},
  setTargetTodoSelect:  () => {},
  setTargetTodoDelete: () => {},
  setDraggingItem: () => {},
  draggingItem: null
});

export const ModalCtxt = createContext<ModalCtxtType>({
  todos: [],
  targetTodo: null,
  targetTodoSelect: null,
  targetTodoDelete: null,
  setTodos: () => {},
  setTargetTodo:  () => {},
  setTargetTodoSelect:  () => {},
  setTargetTodoDelete:  () => {}
});