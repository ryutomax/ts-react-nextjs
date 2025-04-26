"use client";

import { useContext } from "react";
import { ModalCtxtType } from '@/app/modules/types/types';
import { ModalCtxt } from "@/app/modules/hooks/context";
import RemoveTodo from '@/app/components/Modal/Delete/RemoveTodo';
import ModalWrapper from '@/app/components/Modal/ModalWrapper';
export default function ModalDelete() {

  const MC: ModalCtxtType = useContext(ModalCtxt);

  return (
    <ModalWrapper isOpen={true} onCancel={() => MC.setTargetDelete(null)}>
      <p>本当に削除しますか？</p>
      <div className="modal-buttons mt-8">
        <button onClick={() => MC.setTargetDelete(null)} className="button-cancel button px-4 py-2 rounded"></button>
        <RemoveTodo />
      </div>
    </ModalWrapper>
  );
}
