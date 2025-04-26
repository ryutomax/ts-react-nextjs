import ModalWrapper from '@/app/components/Modal/ModalWrapper';
import LimitDateInput from '@/app/components/TodoAddArea/LimitDateInput';
import ModalButtons from '@/app/components/TodoAddArea/ModalButtons';

type ModalLimitDateProps = {
  isOpen: boolean;
  limitDate: string;
  limitHour: string;
  limitMin: string;
  onDateChange: (date: string) => void;
  onHourChange: (hour: string) => void;
  onMinChange: (min: string) => void;
  onConfirm: (date: string, hour: string, min: string) => void;
  onCancel: () => void;
}

export default function ModalLimitDate({
  isOpen,
  limitDate,
  limitHour,
  limitMin,
  onDateChange,
  onHourChange,
  onMinChange,
  onConfirm,
  onCancel
}: ModalLimitDateProps) {
  return (
    <ModalWrapper isOpen={isOpen} onCancel={onCancel}>
      <p className="modal-title">期限を選択してください。</p>
      <LimitDateInput
        limitDate={limitDate}
        limitHour={limitHour}
        limitMin={limitMin}
        onDateChange={onDateChange}
        onHourChange={onHourChange}
        onMinChange={onMinChange}
      />
      <ModalButtons
        onCancel={onCancel}
        onAgree={() => onConfirm(limitDate, limitHour, limitMin)}
      />
    </ModalWrapper>
  );
} 