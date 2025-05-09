import { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable";
import { Todo } from "@/app/modules/types/types";
import { Dispatch, SetStateAction } from "react";

export const handleDragStart = (
  event: DragStartEvent,
  todos: Todo[],
  setDraggingItem: (value: SetStateAction<Todo | null>) => void
) => {
  const draggedItem = todos.find((todo) => todo.id == event.active.id);
  setDraggingItem(draggedItem || null);
};

export const handleDragEnd = (
  event: DragEndEvent,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
  const { active, over } = event;
  if (!over) throw new Error('error: over is null');

  if (active.id !== over.id) {
    dndExchangeId(Number(active.id), Number(over.id))
    const oldIndex = todos.findIndex(todo => todo.id === active.id);
    const newIndex = todos.findIndex(todo => todo.id === over.id);
    setTodos(arrayMove(todos, oldIndex, newIndex));
  }
};

const dndExchangeId = async (activeId: number, overId: number) => {
  try {
    // API に PUT リクエスト
    const response = await fetch("/api/todos/dnd", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeId, overId }),
    });
    if (!response.ok) throw new Error('Failed to update todo');

  } catch (error) {
    console.error("Error update todos:", error);
  }
}