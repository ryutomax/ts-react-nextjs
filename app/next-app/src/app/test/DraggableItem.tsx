import { useDraggable } from "@dnd-kit/core";
import { Todo } from '@/app/types/types';

const DraggableItem = ({todo, setDraggingItem}: {todo: Todo; setDraggingItem: (todo: Todo | null) => void;}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({id: todo.id,});

  const style = {
    padding: "10px",
    border: "1px solid gray",
    marginBottom: "5px",
    cursor: "grab",
    backgroundColor: "black",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDraggingItem(todo)}
    >
      {todo.name}-{todo.groupId}
    </div>
  );
};

export default DraggableItem;