import { useEffect, useContext } from "react";
import { ListHeaderCtxtType } from '@/app/modules/types/types';

import { pageTypeFav, pageTypeGroup, ListHeaderCtxt } from "@/app/modules/hooks/context";

export default function SearchTodo() {
  
  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);
  const LH: ListHeaderCtxtType = useContext(ListHeaderCtxt);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchTodo(LH.searchQuery);
    }, 750); // 遅延でリクエスト回数減

    return () => clearTimeout(delayDebounce);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LH.searchQuery]);
  
  const searchTodo = async (searchText: string) => {
    try {
      LH.setQuery(searchText);

      const response = await fetch("/api/todos/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: searchText,
          completed: !LH.isChecked,
          isfavorite: valueFav,
          groupId: valueGroup
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      LH.setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  
  return(
    <div className="mb-8 mr-auto ml-auto block text-center">
      <input
        type="text"
        value={LH.searchQuery}
        onChange={(e) => LH.setQuery(e.target.value)}
        placeholder="Search TODO"
        className="todo-input mr-4 w-10/12"
      />
      <button className='button' onClick={() => searchTodo(LH.searchQuery)}>検索</button>
    </div>
  );
}