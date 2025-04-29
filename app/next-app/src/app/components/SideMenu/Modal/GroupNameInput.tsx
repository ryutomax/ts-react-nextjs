type GroupNameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function GroupNameInput({ value, onChange }: GroupNameInputProps) {
  return (
    <>
      <h2 className="modal-title">グループ名を編集</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="modal-input"
      />
    </>
  );
} 