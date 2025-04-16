interface LimitDateDisplayProps {
  newTodoName: string;
  limitDate: string;
  limitHour: string;
  limitMin: string;
}

export default function LimitDateDisplay({
  newTodoName,
  limitDate,
  limitHour,
  limitMin
}: LimitDateDisplayProps) {
  if (!newTodoName || !limitDate) return null;

  return (
    <div className="todo-input-limit">
      <time>
        {limitDate}
        {limitHour !== '' && limitMin !== '' && ` ${limitHour}:${limitMin}`}
      </time>
    </div>
  );
} 