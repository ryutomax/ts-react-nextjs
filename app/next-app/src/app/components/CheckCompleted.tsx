import { Dispatch, SetStateAction } from "react";
import { Todo } from '../types/types';

type CheckCompletedProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  sendMsgToParent: (message: string) => void;
}

export default function CheckCompleted({setTodos, sendMsgToParent}: CheckCompletedProps) {

  const filteredByCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = event.target.checked;
    sendMsgToParent("");

    const response = await fetch('/api/todos/filered', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !isChecked }),
    });
    if (!response.ok) throw new Error('Failed to filtered todo');

    const filderedTodo = await response.json();
    setTodos(filderedTodo);
  };
  return(
    <div className="checkCompleted">
      <input 
        type="checkbox"
        onChange={filteredByCheckbox}
        id="filterd-completed"
      />
      <label htmlFor="filterd-completed">完了したタスクを非表示</label>
    </div>
  );
}