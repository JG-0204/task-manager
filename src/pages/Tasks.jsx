import { useState } from 'react';
import { Spinner } from '@radix-ui/themes';
import { useLoaderData } from 'react-router-dom';

import tasksService from '../services/tasks';

import TasksContext from '../components/TasksContext';

import TasksList from '../components/TasksList';

const Tasks = () => {
  const initialTasks = useLoaderData();
  const [tasks, setTasks] = useState(initialTasks);

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

  const toggleStatus = async (newStatus, id) => {
    const updatedTask = await tasksService.changeTaskStatus(newStatus, id);

    setTasks((tasks) =>
      tasks.map((task) => (task.id !== id ? task : updatedTask))
    );
  };

  const refreshSubTasks = async (subtasks, id) => {
    const updatedTask = await tasksService.refreshSubTasks(subtasks, id);

    setTasks((tasks) =>
      tasks.map((task) => (task.id !== id ? task : updatedTask))
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        toggleStatus,
        refreshSubTasks,
      }}
    >
      {!tasks ? <Spinner size="3" loading="true" /> : <TasksList />}
    </TasksContext.Provider>
  );
};

export default Tasks;
