import { useContext } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { TodoListCtxt } from "@/app/modules/hooks/context";
import { TodoListCtxtType } from '@/app/modules/types/types';

import { SkeletonList } from '@/app/components/Common/Loading';
import DragOverlayItem from "@/app/components/ListItem/DragOverlay";
import { handleDragStart, handleDragEnd } from '@/app/modules/functions/dnd';
import TodoItem from "@/app/components/ListItem/TodoItem";

export default function TodoList() {
  const TLC: TodoListCtxtType = useContext(TodoListCtxt);

  return(
    <div className="todo-list-frame">
      <DndContext 
        collisionDetection={closestCenter} 
        onDragStart={(event) => handleDragStart(event, TLC.todos, TLC.setDraggingItem)} 
        onDragEnd={(event) => handleDragEnd(event, TLC.todos, TLC.setTodos)}
      >
        <SortableContext items={TLC.todos} strategy={verticalListSortingStrategy}>   
          {TLC.isLoading ? (
            <SkeletonList />
          ) : TLC.todos.length !== 0 ? (
            <ul className="todo-list">
              {TLC.todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo}
                />
              ))}
            </ul>
          ) : (
            <p className="">該当するタスクはありません</p>
          )}
        </SortableContext>
        <DragOverlayItem draggingItem={TLC.draggingItem}/>
      </DndContext>
    </div>
  );
}