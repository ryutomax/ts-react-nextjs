type ModalButtonsProps = {
  onCancel: () => void;
  onAgree: () => void;
};

export default function ModalButtons({ onCancel, onAgree }: ModalButtonsProps) {
  return (
    <div className="modal-buttons mt-8">
      <button
        className="button-cancel button"
        onClick={onCancel}
      ></button>
      <button
        className="button-agree button"
        onClick={onAgree}
      ></button>
    </div>
  );
} 