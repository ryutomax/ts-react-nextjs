"use client";

import { useContext} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from '@/app/modules/types/types';

import { TodoListCtxt } from "@/app/modules/hooks/context";
import { TodoListCtxtType } from '@/app/modules/types/types';

import UpdateStatus from '@/app/components/ListItem/UpdateStatus';
import FavoriteBtn from '@/app/components/ListItem/FavoriteBtn';

import { pageTypeFav, pageTypeGroup } from "@/app/modules/hooks/context";

type SortableItemProps = {
  id: number; //params key for D&D 
  todo: Todo;
}

export default function TodoItem({ id, todo }: SortableItemProps) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const TLC: TodoListCtxtType = useContext(TodoListCtxt);

  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li 
      ref={setNodeRef} 
      className="todo-item" key={todo.id} 
      style={{ ...style, opacity: todo.completed ? "0.7" : "1" }}
    >
      <UpdateStatus 
        setTodos={TLC.setTodos}
        todo={todo}
        prevTodos={[...TLC.todos]}
        sendMsgToParent={TLC.sendMsgToParent} // from parent      
      />
      <span 
        className="todo-name"
        onClick={() => TLC.setTargetTodo(todo)}
      >
        {todo.name}
      </span>
      <button className="button-edit button mr-2" onClick={() => TLC.setTargetTodoDelete(todo)}>削除</button>
      <FavoriteBtn
        todo={todo}
        prevTodos={[...TLC.todos]}
        setTodos={TLC.setTodos}
      />
      {/* D & D area */}
      <button 
        {...attributes}
        {...listeners}
        onMouseDown={() => TLC.setDraggingItem(todo)}
        className="todo-move cursor-move inline-block p-1 text-4xl bg-blacl-400 rounded ml-6"
      >
        <svg viewBox="0 0 20 20" width="24"><path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path></svg>
      </button>

      {/* {(valueFav || valueGroup == 1) && ( */}
        <span className="todo-groupName">{todo.group.name ?? "No Group"}</span>
      {/* )} */}
    </li>
  );
};