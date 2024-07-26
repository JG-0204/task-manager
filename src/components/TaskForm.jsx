import { useState } from 'react';

const TaskForm = ({ add }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!task) {
      console.log('input a task');
      return;
    }

    const newTask = {
      task,
      description: !description ? 'No description added.' : description,
    };

    add(newTask);

    setTask('');
    setDescription('');
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
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
