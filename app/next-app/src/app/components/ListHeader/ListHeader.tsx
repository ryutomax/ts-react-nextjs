import CheckCompleted from '@/app/components/ListHeader/CheckCompleted'
import SearchTodo from "@/app/components/ListHeader/SearchTodo";

export default function ListHeader() {

  return(
    <>
      <SearchTodo />    
      <CheckCompleted />
    </>
  );
}