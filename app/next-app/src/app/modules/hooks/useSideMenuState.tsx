import { useState } from "react";

export type SideMenuKey = string | number;

export const useSideMenuState = () => {
  // サイドメニューの開閉状態
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 選択中のメニュー（IDやキー）
  const [selectedMenu, setSelectedMenu] = useState<SideMenuKey | null>(null);
  // 展開中のサブメニュー（IDやキー）
  const [expandedSubMenu, setExpandedSubMenu] = useState<SideMenuKey | null>(null);

  return {
    isOpen,
    setIsOpen,
    selectedMenu,
    setSelectedMenu,
    expandedSubMenu,
    setExpandedSubMenu,
  };
}; 