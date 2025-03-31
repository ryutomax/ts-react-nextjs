import useSWR from "swr";

import { useParams } from "next/navigation";
import { Todo } from "@/app/modules/types/types";
import { useTodoState } from "@/app/modules/hooks/useTodoState"

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Todo[]>);
}

export const useFetchTodos = (routtingPath: string) => {
  const TS = useTodoState();
  const { data, isLoading, isValidating } = useSWR(routtingPath, fetcher, {
    // revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
    onSuccess: (fetchedData) => {
      TS.setTodos(fetchedData);
    }
  });

  return { data, isLoading ,isValidating };
}

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