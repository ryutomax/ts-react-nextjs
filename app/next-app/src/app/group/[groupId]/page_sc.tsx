import { getBaseUrl } from "@/app/modules/module";
import { Group } from '@/app/types/types';


async function getGroupData(groupId: number) {
  
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/groups/page?groupId=${groupId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch group data");
  }
  return res.json();
}

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const {groupId} = await params;
  const groupTodos = await getGroupData(Number(groupId));

  return (
    <div>
      

      <ul>
        {groupTodos && (
          groupTodos.map((groupTodo: Group) => (
            <li key={groupTodo.id}>
              <h1>{groupTodo.name}</h1>
              <p>ID: {groupTodo.id}</p>
            </li>
          ))
        )}
      </ul>

    </div>
  );
}