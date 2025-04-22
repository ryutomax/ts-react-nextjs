import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher2 = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
});

export const useFetchGroupName = () => {
  const params = useParams();
  const groupId = Number(params.groupId);

  const { data, isLoading } = useSWR(`/api/groups/name?groupId=${Number(groupId)}`, fetcher2, {
    // revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
  });

  const groupName = data?.groupName?.[0]?.name ?? "";

  return {
    isLoading,
    groupId,
    groupName
  }
}