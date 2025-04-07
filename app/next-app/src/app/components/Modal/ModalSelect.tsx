import { ModalCtxt } from "@/app/modules/hooks/context";
import { ModalCtxtType } from "@/app/modules/types/types";
import { useContext } from "react";

export default function ModalSelect() {
  const MC: ModalCtxtType = useContext(ModalCtxt);

  return(
    <div 
      className="modal inset-0"
      onClick={() => MC.setTargetSelect(null)}
    >
      <div
        className="modal-window p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title text-xl font-bold">操作を選択</h2>

        <div className="modal-buttons mt-8">
          <button 
            onClick={() => {
              MC.setTargetDelete(MC.targetSelect);
              MC.setTargetSelect(null);
            }} 
            className="button-delete button">削除
          </button>
          <button 
            onClick={() => {
              MC.setTargetUpdate(MC.targetSelect);
              MC.setTargetSelect(null);
            }}
            className="button-update button">更新
          </button>
          <button onClick={() => MC.setTargetSelect(null)} className="button-cancel button px-4 py-2 rounded">キャンセル</button>
        </div>
      </div>
    </div>
  );
}