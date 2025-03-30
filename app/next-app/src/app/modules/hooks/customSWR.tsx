import useSWR from "swr";

import { useTodoState } from "@/app/modules/hooks/useTodoState"
import { useParams } from "next/navigation";


const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
});


export const useFetchHome = () => {
  const TS = useTodoState();

  const { isLoading } = useSWR("/api/todos", fetcher, {
    revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
    onSuccess: (fetchedData) => {
      TS.setTodos(fetchedData);
    }
  });

  return isLoading;
} 

export const useFetchFavs = () => {
  const TS = useTodoState();

  const { isLoading } = useSWR("/api/todos/favorite", fetcher, {
    revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
    onSuccess: (fetchedData) => {
      TS.setTodos(fetchedData);
    }
  });

  return isLoading;
}

export const useFetchGroups = () => {
  const TS = useTodoState();
  const params = useParams();
  const groupId = Number(params.groupId);

  const { isLoading } = useSWR(`/api/groups/page?groupId=${Number(groupId)}`, fetcher, {
    revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
    onSuccess: (fetchedData) => {
      TS.setTodos(fetchedData);
    }
  });

  return {
    isLoading
  }
}

export const useFetchGroupName = () => {
  const params = useParams();
  const groupId = Number(params.groupId);

  const { data, isLoading } = useSWR(`/api/groups/name?groupId=${Number(groupId)}`, fetcher, {
    revalidateOnFocus: true,  // タブを戻ったときに最新データ取得
  });

  const groupName = data?.groupName?.[0]?.name ?? "";

  return {
    isLoading,
    groupId,
    groupName
  }
}