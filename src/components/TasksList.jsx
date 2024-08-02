import { useState } from 'react';

const Task = ({ task, deleteTask, update }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.task);
  const [taskDesc, setTaskDesc] = useState(task.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedTask = {
      ...task,
      task: taskName,
      description: taskDesc,
    };

    update(updatedTask);

    setIsEditing(false);

    setTaskName(updatedTask.task);
    setTaskDesc(updatedTask.description);
  };

  return (
    <div>
      {!isEditing ? (
        <li>
          <div>
            Task: {taskName} <br /> Description: {taskDesc} <br />
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
          <button type="submit">update</button>
        </form>
      )}
    </div>
  );
};

const TasksList = ({ tasks, deleteTask, updateTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          deleteTask={deleteTask}
          update={updateTask}
        />
      ))}
    </ul>
  );
};

export default TasksList;
