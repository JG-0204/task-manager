import { Outlet } from 'react-router-dom';

export default function TasksLayout() {
  return (
    <div>
      <h1>All tasks</h1>

      <Outlet />
    </div>
  );
}
