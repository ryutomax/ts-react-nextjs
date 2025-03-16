import TodoList from './components/TodoList'
import SideMenu from './components/SideMenu'

export default function Home() {

  return (
    <div>
      <SideMenu />
      <TodoList />
    </div>
  );
}