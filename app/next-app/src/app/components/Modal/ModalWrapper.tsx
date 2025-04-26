type ModalWrapperProps = {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

export default function ModalWrapper({ isOpen, onCancel, children }: ModalWrapperProps) {
  if (!isOpen) return null;
  return (
    <div className={`modal inset-0`} onClick={onCancel}>
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
} 