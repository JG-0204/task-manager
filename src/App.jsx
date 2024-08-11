import tasksService from './services/tasks';

import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';

import { useEffect, useState } from 'react';
import TasksContext from './components/taskContext';

const App = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await tasksService.getAllTasks();
      setTasks(data);
    })();
  }, []);

  const addTask = async (newTask) => {
    const task = await tasksService.createNewTask(newTask);
    setTasks(tasks.concat(task));
  };

  const deleteTask = async (id) => {
    await tasksService.deleteTask(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const updateTask = async (updatedTask) => {
    await tasksService.updateTask(updatedTask);
    const id = updatedTask.id;

    setTasks((tasks) =>
      tasks.map((task) => (task.id !== id ? task : updatedTask))
    );
  };

  return (
    <div>
      <h1>tasks</h1>
      <h3>add new</h3>
      <TasksContext.Provider
        value={{
          tasks,
          addTask,
          deleteTask,
          updateTask,
        }}
      >
        <TaskForm />
        {!tasks ? <h3>loading....</h3> : <TasksList />}
      </TasksContext.Provider>
    </div>
  );
};

export default App;
