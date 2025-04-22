import { useState } from "react";
import { Todo } from "@/app/modules/types/types";

export const useTodoState = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetUpdate, setTargetUpdate] = useState<Todo | null>(null);
  const [targetDelete, setTargetDelete] = useState<Todo | null>(null);
  const [targetSelect, setTargetSelect] = useState<Todo | null>(null);
  const [isChecked, setCheckValue] = useState<boolean>(false); //完了タスク非表示
  const [searchQuery, setQuery] = useState<string>(""); //キーワード検索
  const [draggingItem, setDraggingItem] = useState<Todo | null>(null); // dndアニメーション

  return {
    todos,
    setTodos,
    targetUpdate,
    setTargetUpdate,
    targetDelete,
    setTargetDelete,
    targetSelect,
    setTargetSelect,
    isChecked,
    setCheckValue,
    searchQuery,
    setQuery,
    draggingItem,
    setDraggingItem
  };
};

export const useTodoAddAreaState = () => {
  const [newTodoName, setNewTodo] = useState<string>('');
  const [limitDate, setLimitDate] = useState<string>('');
  const [limitHour, setLimitHour] = useState<string>('');
  const [limitMin, setLimitMin] = useState<string>('');
  const [limitModal, setLimitModal] = useState<boolean>(false);

  return {
    newTodoName,
    setNewTodo,
    limitDate,
    setLimitDate,
    limitHour,
    setLimitHour,
    limitMin,
    setLimitMin,
    limitModal,
    setLimitModal
  };
};
