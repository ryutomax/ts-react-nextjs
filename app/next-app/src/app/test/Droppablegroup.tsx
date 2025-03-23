import { useDroppable } from "@dnd-kit/core";
import { Group } from '@/app/types/types';

const Droppablegroup = ({
  group,
  children,
}: {
  group: Group;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: group.id.toString(),
  });

  const style = {
    padding: "20px",
    border: "2px solid gray",
    backgroundColor: isOver ? "lightblue" : "black",
    minHeight: "100px",
    width: "150px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{group.name}</h3>
        {children}
    </div>
  );
};

export default Droppablegroup;