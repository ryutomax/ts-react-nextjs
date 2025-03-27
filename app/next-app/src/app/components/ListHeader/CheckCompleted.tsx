import { useState, useEffect, useContext } from "react";
import { ListHeaderCtxtType } from '@/app/modules/types/types';

import { pageTypeFav, pageTypeGroup, ListHeaderCtxt } from "@/app/modules/contexts/context";

export default function CheckCompleted() {

  const [isChecked, setIsChecked] = useState(false);
  
  const valueGroup: number = useContext(pageTypeGroup);
  const valueFav: boolean = useContext(pageTypeFav);
  const LH: ListHeaderCtxtType = useContext(ListHeaderCtxt);

  useEffect(() => {
    const fetchFilteredTodos = async () => {
      LH.sendMsgToParent("");
      LH.setCheckValue(isChecked);

      try {
        const response = await fetch('/api/todos/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: LH.searchQuery,
            completed: !isChecked, // trueなら未完了のタスクを取得
            isfavorite: valueFav,
            groupId: valueGroup
          }),
        });

        if (!response.ok) throw new Error('Failed to filter todo');

        const filteredTodo = await response.json();
        LH.setTodos(filteredTodo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <div className="checkCompleted mb-2">
      <input 
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        id="filterd-completed"
        className="mr-2"
      />
      <label htmlFor="filterd-completed">完了したタスクを非表示</label>
    </div>
  );
}