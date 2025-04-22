import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import ModalUpdate from '@/app/components/Modal/ModalUpdate'
import ModalDelete from '@/app/components/Modal/ModalDelete'
import ModalSelect from '@/app/components/Modal/ModalSelect'

export default function Modal(){
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
        />
      )}
      {MC.targetDelete && (
        <ModalDelete />
      )}
    </>
  );
}