import { Outlet } from 'react-router-dom';

export default function TasksLayout() {
  return (
    <div>
      <h1 className="tasks-heading">All tasks</h1>

      <Outlet />
    </div>
  );
}
