import { Heading, Spinner, Section } from '@radix-ui/themes';

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
    <div>
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
        <TaskForm />
        <Heading as="h1">Tasks</Heading>
        <Section size="1"></Section>
        {!tasks ? <Spinner size="3" loading="true" /> : <TasksList />}
      </TasksContext.Provider>
    </div>
  );
};

export default App;
