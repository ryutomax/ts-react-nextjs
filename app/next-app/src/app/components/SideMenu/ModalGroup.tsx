import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import ModalUpdate from '@/app/components/Modal/Update/ModalUpdate'
import ModalDelete from '@/app/components/Modal/Delete/ModalDelete'
import ModalSelect from '@/app/components/Modal/Select/ModalSelect'

export default function ModalGroup(){
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <>
      {MC.targetSelect && (
        <ModalSelect />
      )}
      {MC.targetUpdate && (
        <ModalUpdate
          targetTodoName={MC.targetUpdate.name}
          targetTodoId={MC.targetUpdate.id}
          targetLimit={MC.targetUpdate.limitDate}
          targetGroupId={MC.targetUpdate.groupId}
          targetGroupName={MC.targetUpdate.group.name}
        />
      )}
      {MC.targetDelete && (
        <ModalDelete />
      )}
    </>
  );
}