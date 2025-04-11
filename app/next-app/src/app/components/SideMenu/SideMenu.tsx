"use client";

import { useState, useEffect } from "react";
import "@/app/assets/styles/sideMenu.scss";
import { Group } from '@/app/modules/types/types';
import Link from "next/link";
import { Alert } from "@/app/components/SweetAlert";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroup] = useState<string>('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/groups?num=true");
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
        <ul className="sideMenu-list mt-4 mb-10">
          <li className="sideMenu-item py-2">
            <Link href={`/`}>HOME</Link>
          </li>
          <li className="sideMenu-item py-2">
            <Link href={`/favorite`}>重要</Link>
          </li>
          {groups && (
            groups.map((group) => (
            <li key={group.id} className="sideMenu-item py-2">
              <Link className="sideMenu-item-link"
                href={`/group/${group.id}`}
              >
                {group.name}
                {group._count.Todo > 0 && (
                  <span className="sideMenu-item-num">{group._count.Todo}</span>
                )}
              </Link>
            </li>
            )
          ))}
        </ul>
        <div className="sideMenu-add">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="New TODO Group"
            className="todo-input"
          />
          <button className='button button-addGroup' onClick={addGroup}>追加</button>
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
