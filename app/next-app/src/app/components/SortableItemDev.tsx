// "use client";

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   createdAt: Date;
// };

// type SortableItemProps = {
//   id: number;
//   todo: Todo;
//   updateStatus: (id: number) => void;
//   removeTodo: (id: number) => void;
//   setTargetTodo: (todo: Todo) => void;
// }

// export default function SortableItemDev(
//   { id, todo, setTargetTodo, removeTodo, updateStatus}: SortableItemProps
// ) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <li 
//       className="todo-item" 
//       key={todo.id} 
//       style={{ ...style, opacity: todo.completed ? '0.7' : '1' }}
//       ref={setNodeRef} {...attributes} {...listeners}
//     >
//       <button 
//         className={`button-status button mr-4 ${ todo.completed ? 'is-completed' : '' }`} 
//         style={{ color: todo.completed ? 'white' : '#ffffff00' }} 
//         onClick={() => updateStatus(todo.id)}
//       ></button>
//       <span className="todo-title">{todo.title}</span>
//       <button className="button-remove button mr-2" onClick={() => removeTodo(todo.id)}>削除</button>
//       <button className="button-edit button" onClick={() => setTargetTodo(todo)}>編集</button>
//     </li>
//   );
// }


import React from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

interface SortableItemDevProps {
  todo: Todo;
  updateStatus: (id: number) => void;
  removeTodo: (id: number) => void;
  setTargetTodo: (todo: Todo) => void;
}

export default function SortableItemDev({ todo, updateStatus, removeTodo, setTargetTodo }: SortableItemDevProps) {
  return (
    <li className="todo-item" key={todo.id} style={{ opacity: todo.completed ? "0.7" : "1" }}>
      <button
        className={`button-status button mr-4 ${todo.completed ? "is-completed" : ""}`}
        style={{ color: todo.completed ? "white" : "#ffffff00" }}
        onClick={() => updateStatus(todo.id)}
      ></button>
      <span className="todo-title">{todo.title}</span>
      <button className="button-remove button mr-2" onClick={() => removeTodo(todo.id)}>削除</button>
      <button className="button-edit button" onClick={() => setTargetTodo(todo)}>編集</button>
    </li>
  );
};