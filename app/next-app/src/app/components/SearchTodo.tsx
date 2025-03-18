import { Dispatch, SetStateAction, useEffect } from "react";
import { Todo } from '@/app/types/types';

type SearchTodo = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setQuery: (searchQuery: string) => void;
  searchQuery: string;
  isChecked: boolean;
}

export default function SearchTodo({setTodos, setQuery, searchQuery, isChecked}: SearchTodo) {
  // 入力が変わるたびに検索（リアルタイム検索）
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchTodo(searchQuery);
    }, 750); // 500ms の遅延でリクエスト回数を減らす

    return () => clearTimeout(delayDebounce);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  
  const searchTodo = async (searchText: string) => {
    try {
      setQuery(searchText);

      const response = await fetch("/api/todos/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: searchText,
          completed: !isChecked
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  
  return(
    <div className="mb-8 mr-auto ml-auto block text-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search TODO"
        className="todo-input mr-4 w-10/12"
      />
      <button className='button' onClick={() => searchTodo(searchQuery)}>検索</button>
    </div>
  );
}