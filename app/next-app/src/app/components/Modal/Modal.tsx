import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import ModalUpdate from '@/app/components/Modal/ModalUpdate'
import ModalDelete from '@/app/components/Modal/ModalDelete'
import ModalSelect from '@/app/components/Modal/ModalSelect'

import "@/app/assets/styles/modal.scss"; 


export default function Modal(){
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <>
      {MC.targetTodoSelect && (
        <ModalSelect />
      )}
      {MC.targetTodo && (
        <ModalUpdate 
        targetTodoName={MC.targetTodo.name}
        targetTodoId={MC.targetTodo.id}
        />
      )}
      {MC.targetTodoDelete && (
        <ModalDelete />
      )}
    </>
  );
}