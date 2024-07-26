import blogService from './services/tasks';

import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';

import { useEffect, useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await blogService.getAllTasks();
      setTasks(data);
    })();
  }, []);

  const addTask = async (newTask) => {
    const task = await blogService.createNewTask(newTask);
    setTasks(tasks.concat(task));
  };

  return (
    <div>
      <h1>tasks</h1>
      <h3>add new</h3>
      <TaskForm add={addTask} />
      {!tasks ? (
        <h3>server connection is closed</h3>
      ) : (
        <TasksList tasks={tasks} />
      )}
    </div>
  );
};

export default App;
