import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/contexts/context";
import ModalUpdateName from '@/app/components/Modal/ModalUpdateName2'
import ModalDeleteTodo from '@/app/components/Modal/ModalDeleteTodo2'


export default function Modal(){
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <>
    {MC.targetTodo && (
      <ModalUpdateName 
        targetTodoName={MC.targetTodo.name}
        targetTodoId={MC.targetTodo.id}
      />
    )}
    {MC.targetTodoDelete && (
      <ModalDeleteTodo />
    )}
    </>
  );
}