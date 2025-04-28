import { ModalCtxt } from "@/app/modules/hooks/context";
import { ModalCtxtType } from "@/app/modules/types/types";
import { useContext } from "react";

import ModalWrapper from '@/app/components/Modal/ModalWrapper';                     

export default function ModalSelectGroup() {
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <ModalWrapper isOpen={true} onCancel={() => MC.setTargetSelect(null)}>
      <h2 className="modal-title">操作を選択</h2>

      <div className="modal-buttons mt-8">
        <button 
          onClick={() => {
            MC.setTargetDelete(MC.targetSelect);
            MC.setTargetSelect(null);
          }} 
          className="button-delete button">
        </button>
        <button 
          onClick={() => {
            MC.setTargetUpdate(MC.targetSelect);
            MC.setTargetSelect(null);
          }}
          className="button-update button">
        </button>
        <button onClick={() => MC.setTargetSelect(null)} className="button-cancel button px-4 py-2 rounded"></button>
      </div>
    </ModalWrapper>
  );
}