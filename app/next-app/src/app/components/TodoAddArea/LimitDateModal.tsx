interface LimitDateModalProps {
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

export default function LimitDateModal({
  isOpen,
  limitDate,
  limitHour,
  limitMin,
  onDateChange,
  onHourChange,
  onMinChange,
  onConfirm,
  onCancel
}: LimitDateModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="modal modal-limit inset-0"
      onClick={onCancel}
    >
      <div
        className="modal-window modal-limit-window"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal-title">期限を選択してください。</p>
        <input 
          type="date" 
          value={limitDate} 
          onChange={(e) => onDateChange(e.target.value)} 
        />
        <select
          name="hour"
          id="hour"
          className="todo-input-time"
          value={limitHour}
          onChange={(e) => onHourChange(e.target.value)}
        >
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i.toString().padStart(2, '0')}>
              {i.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
        :
        <select
          name="minute"
          id="minute"
          className="todo-input-time"
          value={limitMin}
          onChange={(e) => onMinChange(e.target.value)}
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <div className="modal-buttons mt-8">
          <button 
            className="button-cancel button px-4 py-2 rounded"
            onClick={onCancel}
          >
            キャンセル
          </button>
          <button
            className="button button-add-limit"
            onClick={() => onConfirm(limitDate, limitHour, limitMin)}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
} 