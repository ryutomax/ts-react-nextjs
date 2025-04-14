"use client";

import { useState, useEffect } from "react";
import "@/app/assets/styles/sideMenu.scss";
import { Group } from '@/app/modules/types/types';
import Link from "next/link";
import AddGroup from "@/app/components/SideMenu/AddGroup";
import { Alert } from "@/app/components/SweetAlert";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理
  const [groups, setGroups] = useState<Group[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetGroup, setTargetGroup] = useState<Group | null>(null);

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

  const handleGroupAdded = (newGroup: Group) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleDeleteClick = (group: Group) => {
    if (group._count.Todo > 0) {
      Alert("タスクがあるため削除できません");
      return;
    }
    setTargetGroup(group);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!targetGroup) return;

    try {
      const response = await fetch(`/api/groups/${targetGroup.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete group');

      setGroups((prevGroups) => prevGroups.filter(g => g.id !== targetGroup.id));
      setShowDeleteModal(false);
      setTargetGroup(null);
    } catch (error) {
      console.error("Error deleting group:", error);
      Alert("グループの削除に失敗しました");
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
                {group._count?.Todo > 0 && (
                  <span className="sideMenu-item-num">{group._count.Todo}</span>
                )}
              </Link>
              <button
                onClick={() => handleDeleteClick(group)}
                className="sideMenu-item-del ml-2 text-red-500 hover:text-red-400"
              >
              </button>
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

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800">本当に削除しますか？</h3>
            <p className="mb-4 text-gray-600">{targetGroup?.name}を削除します。この操作は取り消せません。</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTargetGroup(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
