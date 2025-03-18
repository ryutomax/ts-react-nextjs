import { Dispatch, SetStateAction } from "react";
import { Todo } from '../types/types';

type CheckCompletedProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setCheckValue: (isChecked: boolean) => void;
  searchQuery: string;
  sendMsgToParent: (message: string) => void;
}

export default function CheckCompleted({setTodos, setCheckValue, searchQuery, sendMsgToParent}: CheckCompletedProps) {

  const filteredByCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = event.target.checked;
    sendMsgToParent("");
    setCheckValue(isChecked);

    const response = await fetch('/api/todos/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: searchQuery,
        completed: !isChecked 
      }),
    });
    if (!response.ok) throw new Error('Failed to filtered todo');

    const filderedTodo = await response.json();
    setTodos(filderedTodo);
  };
  return(
    <div className="checkCompleted mb-2">
      <input 
        type="checkbox"
        onChange={filteredByCheckbox}
        id="filterd-completed"
        className="mr-2"
      />
      <label htmlFor="filterd-completed">完了したタスクを非表示</label>
    </div>
  );
}