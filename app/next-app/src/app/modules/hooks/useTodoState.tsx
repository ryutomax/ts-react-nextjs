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
