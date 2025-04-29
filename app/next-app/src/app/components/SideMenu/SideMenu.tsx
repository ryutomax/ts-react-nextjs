"use client";

import { useState } from "react";
import { Group } from '@/app/modules/types/types';
import { ModalGroupCtxt } from "@/app/modules/hooks/context";

import Link from "next/link";

import AddGroup from "@/app/components/SideMenu/AddGroup";
import useSWR from "swr";
import ModalGroup from "@/app/components/SideMenu/Modal/ModalGroup";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch groups");
  return response.json();
};

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理

  const [targetSelectGroup, setTargetSelectGroup] = useState<Group | null>(null);
  const [targetUpdateGroup, setTargetUpdateGroup] = useState<Group | null>(null);
  const [targetDeleteGroup, setTargetDeleteGroup] = useState<Group | null>(null);

  const { data: fetchgroups = [], mutate } = useSWR<Group[]>("/api/groups?num=true", fetcher);

  const handleAddGroup = (newGroup: Group) => {
    mutate([...fetchgroups, newGroup], false);
  };

  const handleRemoveGroup = (groupId: number) => {
    mutate(fetchgroups.filter(g => g.id !== groupId), false);
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
          {fetchgroups && (
            fetchgroups.map((group) => (
            <li key={group.id} className="sideMenu-item py-2">
              <Link className="sideMenu-item-link"
                href={`/group/${group.id}`}
              >
                {group.name}
                {group._count?.Todo > 0 && (
                  <span className="sideMenu-item-num">{group._count.Todo}</span>
                )}
              </Link>
              <button onClick={() => setTargetSelectGroup(group)}>
                <svg viewBox="0 0 6 18" width="16" height="16" fill="white">
                  <circle cx="3" cy="3" r="2"/>
                  <circle cx="3" cy="9" r="2"/>
                  <circle cx="3" cy="15" r="2"/>
                </svg>
              </button>
            </li>
            )
          ))}
        </ul>
        <AddGroup 
          onGroupAdded={handleAddGroup} 
        />
      </div>
      <ModalGroupCtxt.Provider value={{
        group: targetSelectGroup,
        targetSelectGroup: targetSelectGroup,
        targetUpdateGroup: targetUpdateGroup,
        targetDeleteGroup: targetDeleteGroup,
        setTargetSelectGroup:  setTargetSelectGroup,
        setTargetUpdateGroup: setTargetUpdateGroup,
        setTargetDeleteGroup:  setTargetDeleteGroup,
        handleRemoveGroup: handleRemoveGroup
      }}><ModalGroup/></ModalGroupCtxt.Provider>
      

      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full" 
          onClick={() => setIsOpen(false)} // クリックで閉じる
        ></div>
      )}
    </div>
  );
};
