"use client";

import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import React from "react";
import { useState } from "react";

type Folder = {
  id: number;
  name: string;
};

type Item = {
  id: string;
  name: string;
  folderId: number;
};

// アイテムのドラッグ可能コンポーネント
const DraggableItem = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    padding: "10px",
    border: "1px solid gray",
    marginBottom: "5px",
    cursor: "grab",
    backgroundColor: "black",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {item.name}-{item.folderId}
    </div>
  );
};

const DroppableFolder = ({ folder, children }: { folder: Folder; children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: folder.id.toString(),
  });

  const style = {
    padding: "20px",
    border: "2px solid white",
    backgroundColor: isOver ? "lightblue" : "white",
    minHeight: "100px",
    width: "150px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{folder.name}</h3>
      {children}
    </div>
  );
};

// メインコンポーネント
export default function DragDrop() {
  const [items, setItems] = useState<Item[]>([
    { id: "item-1", name: "Item 1", folderId: 1 },
    { id: "item-2", name: "Item 2", folderId: 1 },
    { id: "item-3", name: "Item 3", folderId: 1 },
  ]);

  const folders: Folder[] = [
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" }, // Folder3を追加
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const itemId = active.id.toString();
      const newFolderId = parseInt(over.id.toString(), 10);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, folderId: newFolderId } : item
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {folders.map((folder, index) => (
          <React.Fragment key={folder.id}>
            {/* n番目の処理で pタグを挿入 */}
            {index == 1 && <p>ここに特定のメッセージを表示</p>}

            <DroppableFolder folder={folder}>
              {items
                .filter((item) => item.folderId === folder.id)
                .map((item) => (
                  <DraggableItem key={item.id} item={item} />
                ))}
            </DroppableFolder>
          </React.Fragment>
        ))}
      </div>
    </DndContext>
  );
}