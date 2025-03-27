export default function ListHeader() {
  return(
    <>
      <h2 className="todo-title">Home</h2>
      <SearchTodo 
        setTodos={TS.setTodos}
        setQuery={TS.setQuery}
        searchQuery={TS.searchQuery}
        isChecked={TS.isChecked}
      />
      <CheckCompleted 
        setTodos={TS.setTodos}
        setCheckValue={TS.setCheckValue}
        searchQuery={TS.searchQuery}
        sendMsgToParent={handleChildReturnMsg}
      />
    </>
  );
}