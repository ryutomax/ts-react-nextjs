import { DragOverlay } from "@dnd-kit/core";
import { Todo } from '@/app/modules/types/types';

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
            backgroundColor: "black",
            cursor: "grabbing",
            color: "white"
          }}
        >
          {draggingItem.name}
        </div>
      )}
    </DragOverlay>
  );
}