async function getGroupData(groupId: string) {
  const res = await fetch(`/api/groups/page?groupId=${groupId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch group data");
  }
  return res.json();
}

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const groupData = await getGroupData(params.groupId);

  return (
    <div>
      <h1>{groupData.name}</h1>
      <p>ID: {groupData.id}</p>
    </div>
  );
}