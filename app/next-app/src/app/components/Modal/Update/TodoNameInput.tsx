type TodoNameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TodoNameInput({ value, onChange }: TodoNameInputProps) {
  return (
    <>
      <h2 className="modal-title">タイトルを編集</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="modal-input"
      />
    </>
  );
} 