// import { DndContext, DragOverlay, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
// import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Todo, Group } from '@/app/types/types';
import DraggableItem from '@/app/test/DraggableItem';
import Droppablegroup from '@/app/test/Droppablegroup';

type MainListProps = {
  todos: Todo[]
  groups: Group[]
  setDraggingItem: (todo: Todo | null) => void
}

export default function MainList({ todos, groups, setDraggingItem }: MainListProps) {

  return(
    // <div style={{ border: "1px solid red", padding: "10px" }}>
    //   {groups
    //     .filter((_, index) => index > 0)
    //     .map((group) => (
    //       <React.Fragment key={group.id}>
    //         <Droppablegroup group={group}>
    //           {todos
    //             .filter((todo) => todo.groupId == group.id)
    //             .map((todo) => (
    //               <DraggableItem key={todo.id} todo={todo} setDraggingItem={setDraggingItem} />
    //             ))}
    //         </Droppablegroup>
    //       </React.Fragment>
          
    //     ))}
    // </div>
    <div style={{ border: "1px solid red", padding: "10px" }}>
      {groups
        .filter((group) => group.id == 4) // 指定した group.id のみ処理
        .map((group) => (
          <React.Fragment key={group.id}>
            <Droppablegroup group={group}>
              {todos
                .filter((todo) => todo.groupId == group.id) // 対応する todo だけ取得
                .map((todo) => (
                  <DraggableItem key={todo.id} todo={todo} setDraggingItem={setDraggingItem} />
                ))}
            </Droppablegroup>
          </React.Fragment>
        ))}
    </div>
  );
}