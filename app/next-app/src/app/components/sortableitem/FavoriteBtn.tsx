import { Dispatch, SetStateAction} from "react";
import Image from 'next/image';
import favOn from "@/app/img/icon/fav-on.png";
import favOff from "@/app/img/icon/fav-off.png";
import { Todo } from '@/app/types/types';

type FavoriteBtnProps = {
  todo: Todo;
  prevTodos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function FavoriteBtn({ todo, prevTodos, setTodos }: FavoriteBtnProps) {

  const toggleFavorite = async (todoId: number) => {
    const storedTodos: Todo[] = prevTodos; //bk
    try {
      setTodos((prevTodos) =>
        prevTodos.map((targetTodo) =>
          targetTodo.id == todo.id ? { ...targetTodo, favorite: !targetTodo.favorite } : targetTodo
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

  return(
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
  );
}