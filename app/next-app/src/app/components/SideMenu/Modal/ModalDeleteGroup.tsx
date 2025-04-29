import { Group } from '@/app/modules/types/types';
import ModalWrapper from '@/app/components/Modal/ModalWrapper';

import { ModalGroupCtxt } from "@/app/modules/hooks/context";
import { ModalGroupCtxtType } from "@/app/modules/types/types";
import { useContext } from 'react';
import { Alert } from "@/app/components/Common/SweetAlert";

type ModalDeleteGroupProps = {
  group: Group | null;
  targetGroupName: string,
  targetGroupId: number,
}

export default function ModalDeleteGroup({
  group, targetGroupName, targetGroupId
}: ModalDeleteGroupProps){
  if (!group) return null;

  const MGC: ModalGroupCtxtType = useContext(ModalGroupCtxt);

  const deleteGroup = async (id: number) => {
    if (group._count.Todo > 0) {
      Alert("タスクがあるため削除できません");
      return;
    }
    try {
      const response = await fetch('/api/groups', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
      if (!response.ok) throw new Error('Failed to delete group');
      MGC.handleRemoveGroup(id); //表示更新
      MGC.setTargetDeleteGroup(null);
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  return (
    <ModalWrapper isOpen={true} onCancel={() => MGC.setTargetSelectGroup(null)}>
      <h3 className="text-lg font-bold mb-4 text-gray-800">本当に削除しますか？</h3>
      <p className="mb-4 text-gray-600">{targetGroupName}を削除します。この操作は取り消せません。</p>
      <div className="flex justify-end gap-4">
        <button 
          onClick={() => MGC.setTargetDeleteGroup(null)} 
          className="button-cancel button px-4 py-2"></button>
        <button
          onClick={() => deleteGroup(targetGroupId)}
          className="button-delete button"
        ></button>
      </div>
    </ModalWrapper>
  );
} 