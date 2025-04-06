import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import ModalUpdate from '@/app/components/Modal/ModalUpdate'
import ModalDelete from '@/app/components/Modal/ModalDelete'

import "@/app/assets/styles/modal.scss"; 


export default function Modal(){
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <>
      {MC.targetTodo && (
        <>
          <button>削除</button>
          <button>更新</button>
        </>
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