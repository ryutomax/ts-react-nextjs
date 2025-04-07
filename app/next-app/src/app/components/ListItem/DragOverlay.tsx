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
            backgroundColor: "white",
            opacity: "0.8",
            cursor: "grabbing",
            color: "black",
            fontWeight: "bold",
            boxShadow: "1px 1px 30px black"
          }}
        >
          {draggingItem.name}
        </div>
      )}
    </DragOverlay>
  );
}