import { ModalGroupCtxt } from "@/app/modules/hooks/context";
import { ModalGroupCtxtType } from "@/app/modules/types/types";
import { useContext } from "react";

import ModalWrapper from '@/app/components/Modal/ModalWrapper';                     

export default function ModalSelectGroup() {
  const MGC: ModalGroupCtxtType = useContext(ModalGroupCtxt);

  const handleCancel = () => {
    MGC.setTargetSelectGroup(null);
  }
  const handleUpdate = () => {
    MGC.setTargetUpdateGroup(MGC.targetSelectGroup);
    MGC.setTargetSelectGroup(null);
  }
  const handleDelete = () => {
    MGC.setTargetDeleteGroup(MGC.targetSelectGroup);
    MGC.setTargetSelectGroup(null);
  }

  return(
    <ModalWrapper isOpen={true} onCancel={handleCancel}>
      <h2 className="modal-title">操作を選択</h2>

      <div className="modal-buttons mt-8">
        <button 
          onClick={handleDelete} 
          className="button-delete button">
        </button>
        <button 
          onClick={handleUpdate}
          className="button-update button">
        </button>
        <button onClick={handleCancel} className="button-cancel button"></button>
      </div>
    </ModalWrapper>
  );
}