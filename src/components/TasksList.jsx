const Task = ({ title, description }) => {
  return (
    <li>
      {title} | {description}
    </li>
  );
};

const TasksList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task title={task.task} description={task.description} key={task.id} />
      ))}
    </ul>
  );
};

export default TasksList;
