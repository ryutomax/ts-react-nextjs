"use client";

import MainTodo from '@/app/components//MainTodo';

import { SkeletonTitle } from "@/app/components/Common/Loading";
import { useFetchGroupName } from "@/app/modules/hooks/customSWR"
import { pageTypeGroup } from "@/app/modules/hooks/context";

export default function GroupPage() {
  const { isLoading, groupId, groupName } = useFetchGroupName();

  return (
    <pageTypeGroup.Provider value={groupId}>
      {isLoading ? (
        <SkeletonTitle />
      ) : groupName.length !== 0 ? (
        <h2 className="todo-title">{groupName}</h2>
      ) : (
        <p className="">該当するタスクはありません</p>
      )}
      <MainTodo pageType={"group"}/>
    
    </pageTypeGroup.Provider>
  );
}