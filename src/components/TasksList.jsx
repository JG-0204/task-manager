import { useContext, useState } from 'react';
import { formatDistance } from 'date-fns';

import TasksContext from './taskContext';

const Task = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TasksContext);

  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.task);
  const [taskDesc, setTaskDesc] = useState(task.description);
  const [taskDue, setTaskDue] = useState(task.dueDate);
  const [taskPrio, setTaskPrio] = useState(task.priority);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      task: taskName,
      description: taskDesc,
      dueDate: taskDue,
      priority: taskPrio,
    };

    updateTask(updatedTask);

    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <li>
          <div>
            Task: {taskName} <br /> Description: {taskDesc} <br />
            Due:{' '}
            {taskDue === 'none' ? taskDue : getDueDate(task.dateAdded, taskDue)}
            <br /> Priority: {taskPrio} <br />
            <button onClick={() => setIsEditing(true)}>edit</button>
            <button onClick={() => deleteTask(task.id)}>delete</button>
          </div>
        </li>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            Task:
            <input
              type="text"
              value={taskName}
              onChange={({ target }) => setTaskName(target.value)}
            />
          </div>
          <div>
            Description:
            <textarea
              cols={15}
              rows={1}
              value={taskDesc}
              onChange={({ target }) => setTaskDesc(target.value)}
            ></textarea>
          </div>
          <div>
            <label>
              due:
              <input
                type="date"
                onChange={({ target }) => setTaskDue(target.value)}
                value={taskDue}
              />
            </label>
          </div>
          <div>
            <label>
              prio:
              <select
                value={taskPrio}
                onChange={({ target }) => setTaskPrio(target.value)}
              >
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <button type="submit">update</button>
        </form>
      )}
    </div>
  );
};

const TasksList = () => {
  const { tasks } = useContext(TasksContext);

  return (
    <ul>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  );
};

const getDueDate = (addDate, dueDate) => {
  const due = formatDistance(addDate, dueDate);
  return due;
};

export default TasksList;
