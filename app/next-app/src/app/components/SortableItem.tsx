"use client";

import { Dispatch, SetStateAction} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from '../types/types';
import RemoveTodo from './RemoveTodo';
import UpdateStatus from './UpdateStatus';

type SortableItemProps = {
  id: number;
  todo: Todo;
  setTargetTodo: (todo: Todo) => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  prevTodos: Todo[];
  sendMsgToParent: (message: string) => void;
}

export default function SortableItem({ id, todo, setTargetTodo, setTodos, prevTodos, sendMsgToParent }: SortableItemProps) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

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
        setTodos={setTodos}
        todo={todo}
        prevTodos={prevTodos}
        sendMsgToParent={sendMsgToParent} // from parent      
      />
      <span className="todo-title">{todo.title}</span>
      <RemoveTodo 
        setTodos={setTodos}
        todo={todo}
        sendMsgToParent={sendMsgToParent} // from parent
      />
      <button className="button-edit button mr-2" onClick={() => setTargetTodo(todo)}>編集</button>
      {/* D & D area */}
      <div {...attributes} {...listeners} className="cursor-move inline-block p-1 text-4xl bg-blacl-400 rounded">
        ☰
      </div>
    </li>
  );
};