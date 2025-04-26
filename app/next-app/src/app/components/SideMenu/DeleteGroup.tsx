import { useState } from "react";
import { Group } from '@/app/modules/types/types';
import { Alert } from "@/app/components/Common/SweetAlert";
import ModalDeleteGroup from "@/app/components/SideMenu/ModalDeleteGroup";

interface DeleteGroupProps {
  group: Group;
  onDelete: (groupId: number) => void;
}

export default function DeleteGroup({ group, onDelete }: DeleteGroupProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    if (group._count.Todo > 0) {
      Alert("タスクがあるため削除できません");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/groups/${group.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete group');

      onDelete(group.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting group:", error);
      Alert("グループの削除に失敗しました");
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="sideMenu-item-del ml-2 text-red-500 hover:text-red-400"
      ></button>

      <ModalDeleteGroup
        isOpen={showDeleteModal}
        group={group}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
} 