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
            padding: "24px 16px 24px 96px",
            borderBottom: "3px solid white",
            backgroundColor: "black",
            opacity: "0.8",
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