// import { DndContext, DragOverlay, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
// import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Todo, Group } from '@/app/types/types';
import DraggableItem from '@/app/test/DraggableItem';
import Droppablegroup from '@/app/test/Droppablegroup';

type SideMenuProps = {
  todos: Todo[]
  groups: Group[]
  setDraggingItem: (todo: Todo | null) => void
}

export default function SideMenu({ todos, groups, setDraggingItem }: SideMenuProps) {

  return(
    <div style={{ border: "1px solid blue", padding: "10px", marginBottom: "10px" }}>
      <p>ここに特定のメッセージを表示</p>
      {groups
        .map((group) => (
          <React.Fragment key={group.id}>
            <Droppablegroup group={group}>
              {todos
                .filter((todo) => todo.groupId === group.id)
                .map((todo) => (
                  <div key={todo.id} style={{display: "block"}}>
                    <DraggableItem todo={todo} setDraggingItem={setDraggingItem} />
                  </div>
                ))}
            </Droppablegroup>
          </React.Fragment>
        ))}
    </div>
  );
}