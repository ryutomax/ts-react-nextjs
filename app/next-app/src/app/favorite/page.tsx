"use client";

import MainTodo from '@/app/components//MainTodo';

import { pageTypeFav } from "@/app/modules/hooks/context";

export default function FavoritePage() {

  return (
    <pageTypeFav.Provider value={true}>
      <h2 className="todo-title">重要</h2>
      <MainTodo pageType={"fav"}/>
    </pageTypeFav.Provider>
  );
}