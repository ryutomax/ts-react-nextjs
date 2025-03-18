"use client";

import { Dispatch, SetStateAction} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from '../types/types';

import Image from 'next/image';
import favOn from "../img/icon/fav-on.png";
import favOff from "../img/icon/fav-off.png";

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

  const toggleFavorite = async (todoId: number) => {
    const storedTodos: Todo[] = prevTodos; //bk
    try {
      setTodos((prevTodos) =>
        prevTodos.map((targetTodo) =>
          targetTodo.id == id ? { ...targetTodo, favorite: !targetTodo.favorite } : targetTodo
        )
      );
  
      const response = await fetch('/api/todos/favorite', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: todoId}),
      });
      if (!response.ok) throw new Error('Failed to favorite todo');

    } catch (error) {
      setTodos(storedTodos); //rollback
      console.error("Error update todos:", error);
    }
  }

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
      <span className="todo-name">{todo.name}</span>
      <RemoveTodo 
        setTodos={setTodos}
        todo={todo}
        sendMsgToParent={sendMsgToParent} // from parent
      />
      <button className="button-edit button mr-2" onClick={() => setTargetTodo(todo)}>編集</button>
      <button 
        className="cursor-pointer"
        onClick={() => toggleFavorite(todo.id)}  
      >
        <Image 
          className={todo.favorite ? "is-fav" : ""}
          src={todo.favorite ? favOn : favOff}
          alt="重要"
          width={24} 
          height={24}
        />
      </button>
      {/* D & D area */}
      <button {...attributes} {...listeners} className="todo-move cursor-move inline-block p-1 text-4xl bg-blacl-400 rounded">
        <svg viewBox="0 0 20 20" width="24"><path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path></svg>
      </button>
    </li>
  );
};