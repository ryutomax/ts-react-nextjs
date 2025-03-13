import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style} className="text-gray-900 p-2 bg-gray-200 rounded-md cursor-pointer">
      <div>
        {text}
      </div>
    </li>
  );
}