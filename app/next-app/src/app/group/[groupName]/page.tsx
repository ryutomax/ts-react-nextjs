"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
// import { getBaseUrl } from "@/app/modules/module";
import { Group, Todo } from '@/app/types/types';

export default function GroupPage() {
  const params = useParams();
  const groupId = params.groupId; 

  const searchParams = useSearchParams();;
  const title = searchParams.get('title');

  const[groupTodos, setGroupTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchGroupTodos = async () => {
      try {
        const response = await fetch(`/api/groups/page?groupId=${Number(groupId)}`);
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setGroupTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchGroupTodos();
  }, []);

  return (
    <div>
      
      <h2>{title}</h2>
      <ul>
        {groupTodos && (
          groupTodos.map((groupTodo) => (
            <li key={groupTodo.id}>
              <h3>{groupTodo.title}</h3>
              <p>ID: {groupTodo.id}</p>
            </li>
          ))
        )}
      </ul>

    </div>
  );
}