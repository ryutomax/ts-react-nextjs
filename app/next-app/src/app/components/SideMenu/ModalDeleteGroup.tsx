import { Group } from '@/app/modules/types/types';

interface ModalDeleteGroupProps {
  isOpen: boolean;
  group: Group | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteGroupModal({
  isOpen,
  group,
  onClose,
  onConfirm,
}: ModalDeleteGroupProps) {
  
  if (!isOpen || !group) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">本当に削除しますか？</h3>
        <p className="mb-4 text-gray-600">{group.name}を削除します。この操作は取り消せません。</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
} 