import { Group } from '@/app/modules/types/types';

type GroupSelectProps = {
  groups: Group[];
  targetGroupId: number;
  targetGroupName: string;
  targetTodoId: number;
  onChange: (groupId: number) => void;
};

export default function GroupSelect({ groups, targetGroupId, targetGroupName, targetTodoId, onChange }: GroupSelectProps) {
  return (
    <>
      <h2 className="modal-title mt-6">グループを変更</h2>
      <select
        className="modal-input"
        name="group"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {groups.length == 0 ? (
          <option value={targetGroupId}>{targetGroupName}</option>
        ) : (
          <>
            <option value={targetGroupId}>{targetGroupName}</option>
            {targetTodoId !== 1 && <option value="1">ALL</option>}
            {(() => {
              const filteredGroups = groups.filter(group => group.id != targetGroupId && group.id != 1);
              return filteredGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ));
            })()}
          </>
        )}
      </select>
    </>
  );
} 