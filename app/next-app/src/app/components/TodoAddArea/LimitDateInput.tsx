type LimitDateInputProps = {
  limitDate: string;
  limitHour: string;
  limitMin: string;
  onDateChange: (date: string) => void;
  onHourChange: (hour: string) => void;
  onMinChange: (min: string) => void;
};

export default function LimitDateInput({
  limitDate,
  limitHour,
  limitMin,
  onDateChange,
  onHourChange,
  onMinChange,
}: LimitDateInputProps) {
  return (
    <div className="modal-input-limit">
      {/* 日付入力 */}
      <input
        type="date"
        value={limitDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
      {/* 時間入力 */}
      <select
        name="hour"
        id="hour"
        className="todo-input-time"
        value={limitHour}
        onChange={(e) => onHourChange(e.target.value)}
      >
        <option value="">--</option>
        {[...Array(24)].map((_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      {/* 分入力 */}
      <select
        name="minute"
        id="minute"
        className="todo-input-time"
        value={limitMin}
        onChange={(e) => onMinChange(e.target.value)}
      >
        <option value="">--</option>
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
    </div>
  );
} 