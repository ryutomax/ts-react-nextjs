import { Dispatch, SetStateAction } from 'react';

export type Todo = {
  id: number;
  name: string;
  completed: boolean;
  favorite: boolean;
  groupId: number;
  createdAt: Date;
  group: {
    name: string;
  };
};

export type Group = {
  id: number;
  name: string;
  createdAt: Date;
};

export type SearchCondition = {
  name?: {
    contains: string;
    mode?: "insensitive" | "default";
  };
  completed?: boolean;
  favorite?: boolean;
  groupId?: number;
};

export type CreateCondition = {
  name: string;
  completed: boolean;
  favorite: boolean;
  groupId: number;
};

export type ListHeaderCtxtType = {
  setTodos: (todos: Todo[]) => void;
  setQuery: (query: string) => void;
  searchQuery: string;
  isChecked: boolean;
  setCheckValue: Dispatch<SetStateAction<boolean>>;
  sendMsgToParent: (message: string) => void
}

export type TodoListCtxtType = {
  todos: Todo[];
  isLoading: boolean;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setTargetTodo: (todos: Todo) => void;
  setTargetTodoDelete: (todos: Todo) => void;
  setDraggingItem:  Dispatch<SetStateAction<Todo | null>>;
  sendMsgToParent: (message: string) => void;
  draggingItem:  Todo | null;
}

export type ModalCtxtType = {
  todos: Todo[];
  targetTodo: Todo | null;
  targetTodoDelete: Todo | null;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setTargetTodo: (todos: Todo | null) => void;
  setTargetTodoDelete: (todos: Todo | null) => void;
  sendMsgToParent: (message: string) => void;
}