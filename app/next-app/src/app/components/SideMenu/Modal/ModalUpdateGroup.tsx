"use client";

import { useState, useContext } from "react";

import { ModalGroupCtxtType } from '@/app/modules/types/types';
import { ModalGroupCtxt } from "@/app/modules/hooks/context";
import { Alert } from "@/app/components/Common/SweetAlert";

import ModalWrapper from '@/app/components/Modal/ModalWrapper';
import ModalButtons from '@/app/components/TodoAddArea/ModalButtons';
import GroupNameInput from '@/app/components/SideMenu/Modal/GroupNameInput';

type ModalUpdateGroupProps = {
  targetGroupName: string,
  targetGroupId: number,
}

export default function ModalUpdateGroup({targetGroupName, targetGroupId}: ModalUpdateGroupProps) {
  const MGC: ModalGroupCtxtType = useContext(ModalGroupCtxt);

  const [newGroupName, setNewGroupName] = useState<string>(targetGroupName);


  const updateGroupName = async (id: number, newGroupName: string) => {
    if (newGroupName == "") {
      return Alert("グループ名を入力してください!!");
    }

    try {
      // API に PUT リクエスト
      const response = await fetch("/api/groups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newGroupName }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedGroup = await response.json();
      MGC.handleUpdateGroup(updatedGroup); 
  

    } catch (error) {
      console.error("Error update group name:", error);
    }
  };

  const execUpdate = () => {
    updateGroupName(targetGroupId, newGroupName);
    MGC.setTargetUpdateGroup(null);
  };

  return (
    <ModalWrapper isOpen={true} onCancel={() => MGC.setTargetUpdateGroup(null)}>
      <GroupNameInput value={newGroupName} onChange={setNewGroupName} />
      <ModalButtons
        onCancel={() => MGC.setTargetUpdateGroup(null)}
        onAgree={execUpdate}
      />
    </ModalWrapper>
  );
}
