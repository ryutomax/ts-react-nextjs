
export default function GroupPage({ params }: { params: { groupId: number } }) {
  const groupId = params.groupId;

  return (
    <div>
      <h1>Group ID: {groupId}</h1>
      <a href={`/group/${groupId}/edit`}>Edit Group</a>
    </div>
  );
}