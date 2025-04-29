"use client";

import { useState } from "react";
import { Alert } from "@/app/components/Common/SweetAlert";
import { Group } from '@/app/modules/types/types';

type AddGroupProps = {
  onGroupAdded: (group: Group) => void;
}

export default function AddGroup({ onGroupAdded }: AddGroupProps) {
  const [newGroupName, setNewGroup] = useState<string>('');

  const addGroup = async () => {
    if (newGroupName == "") {
      return Alert("グループ名を入力してください!!");
    }
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName }),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const addedGroup = await response.json();
      onGroupAdded(addedGroup);
      setNewGroup('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  return (
    <div className="sideMenu-add">
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroup(e.target.value)}
        placeholder="New TODO Group"
        className="todo-input-name"
      />
      <button className='button button-addGroup' onClick={addGroup}>追加</button>
    </div>
  );
} 