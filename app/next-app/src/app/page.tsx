"use client";

import MainTodo from '@/app/components//MainTodo';

export default function Home() {

  return (
    <>
      <h2 className="todo-title">Home</h2>
      <MainTodo pageType={"home"} />   
    </>
  );
}