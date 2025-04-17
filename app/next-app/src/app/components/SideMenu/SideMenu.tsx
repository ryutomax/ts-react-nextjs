"use client";

import { useState } from "react";
import { Group } from '@/app/modules/types/types';
import Link from "next/link";
import AddGroup from "@/app/components/SideMenu/AddGroup";
import DeleteGroup from "@/app/components/SideMenu/DeleteGroup";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch groups");
  return response.json();
};

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理
  const { data: groups = [], mutate } = useSWR<Group[]>("/api/groups?num=true", fetcher);

  const handleGroupAdded = (newGroup: Group) => {
    mutate([...groups, newGroup], false);
  };

  const handleGroupDeleted = (groupId: number) => {
    mutate(groups.filter(g => g.id !== groupId), false);
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
                {group._count?.Todo > 0 && (
                  <span className="sideMenu-item-num">{group._count.Todo}</span>
                )}
              </Link>
              <DeleteGroup
                group={group}
                onDelete={handleGroupDeleted}
              />
            </li>
            )
          ))}
        </ul>
        <AddGroup onGroupAdded={handleGroupAdded} />
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
