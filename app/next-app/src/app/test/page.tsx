"use client";

import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
import { useState, useEffect } from "react";
import { Todo, Group } from '@/app/types/types';
import SideMenu from '@/app/test/SideMenu';
import DragOverlayItem from "@/app/test/DragOverlay";
import MainList from "@/app/test//MainList";

export default function DragDrop() {

  const [draggingItem, setDraggingItem] = useState<Todo | null>(null);

  const [groups, setGroups] = useState<Group[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // 初期表示
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch("/api/groups");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }

      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchDates();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const draggedItem = todos.find((todo) => todo.id == event.active.id);
    setDraggingItem(draggedItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      updateGrups(Number(active.id), Number(over.id));
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === active.id ? { ...todo, groupId: parseInt(over.id.toString()) } : todo
        )
      );
    }
    setDraggingItem(null);
  };

  const updateGrups = async (id: number, groupId: number) => {
    try {
      const response = await fetch('/api/groups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: id,
          groupId: groupId
        }), 
      });
      if (!response.ok) throw new Error('Failed to update todo');

    } catch (error) {
      console.error("Error update todos:", error);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex" }}>
        <SideMenu 
          groups={groups}
          todos={todos}
          setDraggingItem={setDraggingItem}
        />
        <MainList
          groups={groups}
          todos={todos}
          setDraggingItem={setDraggingItem}
        />
      </div>

      <DragOverlayItem draggingItem={draggingItem}/>
      
    </DndContext>
  );
}
