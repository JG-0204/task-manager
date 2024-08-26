import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import './App.css';

import taskService from './services/tasks';

import Root from './layouts/Root';
import TasksLayout from './layouts/TasksLayout';

import Home from './pages/Home';
import Tasks from './pages/Tasks';

const tasksLoader = async () => await taskService.getAllTasks();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />}></Route>
      <Route path="tasks" element={<TasksLayout />}>
        <Route index element={<Tasks />} loader={tasksLoader}></Route>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
