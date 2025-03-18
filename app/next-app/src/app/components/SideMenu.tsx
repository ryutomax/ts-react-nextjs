"use client";

import { useState, useEffect } from "react";
import "../styles/sideMenu.scss";
import { Group } from '../types/types';
import Link from "next/link";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroup] = useState<string>('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/groups");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const addGroup = async () => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName }),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const addedGroup = await response.json();
      setGroups((prevGroups) => [...prevGroups, addedGroup]);
      setNewGroup('');

    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  return (
    <div className="relative">
      {/* メニューを開くボタン */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="sideMenu-btn p-2 bg-blue-500 text-white rounded"
      >
        {isOpen ? "CLOSE" : "MENU"}
      </button>

      <div
        className={`sideMenu fixed ztop-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-4 mb-10">
          <li className="py-2">
            <Link href={`/favorite`}>重要</Link></li>
          <li className="py-2">
            <Link href={`/`}>All</Link>
          </li>
          {groups && (
            groups.map((group) => (
            <li key={group.id} className="py-2">
              <Link 
                href={`/group/${group.id}`}
              >{group.name}</Link>
            </li>
            )
          ))}
        </ul>
        <div className="text-start">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="New TODO Group"
            className="todo-input mb-4"
          />
          <button className='button' onClick={addGroup}>追加</button>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full" 
          onClick={() => setIsOpen(false)} // クリックで閉じる
        ></div>
      )}
    </div>
  );
};
