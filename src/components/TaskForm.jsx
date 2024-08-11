import { useState, useContext } from 'react';
import TasksContext from './taskContext';

const TaskForm = () => {
  const { addTask } = useContext(TasksContext);

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('none');
  const [dueDate, setDueDate] = useState('none');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task) {
      console.log('input a task');
      return;
    }

    const newTask = {
      task,
      description: !description ? 'No description added.' : description,
      priority,
      dueDate,
    };

    addTask(newTask);

    setTask('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          task:
          <input
            type="text"
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          description:
          <textarea
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            rows={3}
            cols={20}
          ></textarea>
        </label>
        <div>
          <label>
            due:
            <input
              type="date"
              value={dueDate}
              onChange={({ target }) => setDueDate(target.value)}
              pattern="\d{2}/\d{2}/\d{4}"
            />
          </label>
        </div>
        <div>
          <label>
            prio:
            <select onChange={({ target }) => setPriority(target.value)}>
              <option value={priority}>None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
