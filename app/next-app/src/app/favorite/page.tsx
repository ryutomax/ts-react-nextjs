"use client";

import { useState, useEffect } from "react";
import { Todo } from '@/app/types/types';

export default function FavoritePage() {
  const [favTodos, setFavTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/todos/favorite");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        setFavTodos(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <>
      <h2>重要</h2>
      <ul>
        {favTodos && (
          favTodos.map((favTodo) => (
            <li key={favTodo.id}>{favTodo.name}</li>
          ))
        )
          
        }
      </ul>
    </>
    

  );
}