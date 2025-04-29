import { Dispatch, SetStateAction } from 'react';

export type Todo = {
  id: number;
  name: string;
  completed: boolean;
  favorite: boolean;
  groupId: number;
  limitDate?: Date | null;
  createdAt: Date;
  group: {
    name: string;
  };
};

export type Group = {
  id: number;
  name: string;
  createdAt: Date;
  _count: {
    Todo: number;
  };
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
  limitDate?: Date | null;
};

export type ListHeaderCtxtType = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setQuery: (query: string) => void;
  searchQuery: string;
  isChecked: boolean;
  setCheckValue: Dispatch<SetStateAction<boolean>>;
}

export type TodoListCtxtType = {
  todos: Todo[];
  isLoading: boolean;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setTargetUpdate: (todos: Todo) => void;
  setTargetSelect: (todos: Todo) => void;
  setTargetDelete: (todos: Todo) => void;
  setDraggingItem:  Dispatch<SetStateAction<Todo | null>>;
  draggingItem:  Todo | null;
}

export type ModalCtxtType = {
  todos: Todo[];
  targetUpdate: Todo | null;
  targetSelect: Todo | null;
  targetDelete: Todo | null;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setTargetUpdate: (todos: Todo | null) => void;
  setTargetSelect: (todos: Todo | null) => void;
  setTargetDelete: (todos: Todo | null) => void;
}

export type ModalGroupCtxtType = {
  group: Group | null;
  targetUpdateGroup: Group | null;
  targetSelectGroup: Group | null;
  targetDeleteGroup: Group | null;
  setTargetUpdateGroup: (groups: Group | null) => void;
  setTargetSelectGroup: (groups: Group | null) => void;
  setTargetDeleteGroup: (groups: Group | null) => void;
  handleUpdateGroup: (newGroup: Group) => void;
  handleRemoveGroup: (groupId: number) => void;
}