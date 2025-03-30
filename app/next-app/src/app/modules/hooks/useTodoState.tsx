import { useState } from "react";
import { Todo } from "@/app/modules/types/types";

export const useTodoState = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [targetTodoDelete, setTargetTodoDelete] = useState<Todo | null>(null);
  const [sysMassage, setChildMessage] = useState<string>(""); //
  const [isChecked, setCheckValue] = useState<boolean>(false); //完了タスク非表示
  const [searchQuery, setQuery] = useState<string>(""); //キーワード検索
  const [draggingItem, setDraggingItem] = useState<Todo | null>(null); // dndアニメーション

  return {
    todos,
    setTodos,
    targetTodo,
    setTargetTodo,
    targetTodoDelete,
    setTargetTodoDelete,
    sysMassage,
    setChildMessage,
    isChecked,
    setCheckValue,
    searchQuery,
    setQuery,
    draggingItem,
    setDraggingItem
  };
};
