import { createContext } from 'react';
import { 
  ListHeaderCtxtType, 
  TodoListCtxtType, 
  ModalCtxtType, 
  ModalGroupCtxtType
} from "@/app/modules/types/types";

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
  setTargetUpdate: () => {},
  setTargetSelect:  () => {},
  setTargetDelete: () => {},
  setDraggingItem: () => {},
  draggingItem: null
});

export const ModalCtxt = createContext<ModalCtxtType>({
  todos: [],
  targetUpdate: null,
  targetSelect: null,
  targetDelete: null,
  setTodos: () => {},
  setTargetUpdate:  () => {},
  setTargetSelect:  () => {},
  setTargetDelete:  () => {},
});

export const ModalGroupCtxt = createContext<ModalGroupCtxtType>({
  group: null,
  targetUpdateGroup: null,
  targetSelectGroup: null,
  targetDeleteGroup: null,
  setTargetUpdateGroup:  () => {},
  setTargetSelectGroup:  () => {},
  setTargetDeleteGroup:  () => {},
  handleRemoveGroup:  () => {}
});