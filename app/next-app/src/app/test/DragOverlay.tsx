import { DragOverlay } from "@dnd-kit/core";
import { Todo } from '@/app/types/types';

type DragOverlayItemProps = {
  draggingItem: Todo | null;
}

export default function DragOverlayItem({ draggingItem }: DragOverlayItemProps ) {

  return(
    <DragOverlay>
      {draggingItem && (
        <div
          style={{
            padding: "10px",
            border: "1px solid gray",
            backgroundColor: "lightgray",
            cursor: "grabbing",
            color: "black"
          }}
        >
          {draggingItem.name}-{draggingItem.groupId}
        </div>
      )}
    </DragOverlay>
  );
}