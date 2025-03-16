"use client";

import { useState } from "react";
import "../styles/sideMenu.scss";

export　default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理

  return (
    <div className="relative">
      {/* メニューを開くボタン */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="sideMenu-btn p-2 bg-blue-500 text-white rounded"
      >
        {isOpen ? "閉じる" : "メニュー"}
      </button>

      <div
        className={`sideMenu fixed ztop-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="text-lg">サイドメニュー</p>
        <ul className="mt-4">
          <li className="py-2">重要</li>
          <li className="py-2">メニュー2</li>
          <li className="py-2">メニュー3</li>
        </ul>
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
