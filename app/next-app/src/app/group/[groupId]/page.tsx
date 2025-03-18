"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Todo } from '@/app/types/types';

export default function GroupPage() {
  const params = useParams();
  const groupId = params.groupId; 

  const [groupName, setGroupName] = useState<string>("");
  const[groupTodos, setGroupTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchGroupTodos = async () => {
      try {
        const response = await fetch(`/api/groups/page?groupId=${Number(groupId)}`);
        
        if (!response.ok) throw new Error("Failed to fetch todos");
        
        const data = await response.json();

        setGroupName(data.groupName[0].title)
        setGroupTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchGroupTodos();
  }, [groupId]);

  return (
    <div>
      
      <h2>{groupName}</h2>
      <ul>
        {groupTodos && (
          groupTodos.map((groupTodo) => (
            <li key={groupTodo.id}>
              <h3>{groupTodo.title}</h3>
              <p>{groupTodo.id}</p>
            </li>
          ))
        )}
      </ul>

    </div>
  );
}