import { useState } from 'react';

import { Button, TextField, Text, Flex, Box } from '@radix-ui/themes';
import {
  TrashIcon,
  Pencil1Icon,
  CheckCircledIcon,
  ArrowLeftIcon,
} from '@radix-ui/react-icons';

const SubTasks = ({ subtasks, refresh }) => {
  const handleSubmit = (newSubTask) => {
    const updatedSubTasks = [...subtasks, newSubTask];

    refresh(updatedSubTasks);
  };

  const handleRemove = (id) => {
    const updatedSubTasks = subtasks.filter((subtask) => subtask.id !== id);

    refresh(updatedSubTasks);
  };

  const handleComplete = (subtask) => {
    const id = subtask.id;

    const updatedSubTask = {
      ...subtask,
      completed: !subtask.completed,
    };

    const updatedSubTasks = subtasks.map((subtask) =>
      subtask.id !== id ? subtask : updatedSubTask
    );

    refresh(updatedSubTasks);
  };

  const handleEdit = (updatedSubTask) => {
    const id = updatedSubTask.id;

    const updatedSubTasks = subtasks.map((subtask) =>
      subtask.id !== id ? subtask : updatedSubTask
    );

    refresh(updatedSubTasks);
  };

  if (subtasks.length === 0) {
    return <SubTaskForm submit={handleSubmit} />;
  }

  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        {subtasks.map((subtask) => (
          <SubTask
            key={subtask.id}
            subtask={subtask}
            complete={handleComplete}
            remove={handleRemove}
            edit={handleEdit}
          />
        ))}
      </ul>

      <SubTaskForm submit={handleSubmit} />
    </div>
  );
};

const SubTaskForm = ({ submit }) => {
  const [subTask, setSubtask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSubTask = {
      title: subTask,
      completed: false,
      id: crypto.randomUUID(),
    };

    submit(newSubTask);
    setSubtask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <Text as="span">Add subtask: </Text>
        <TextField.Root
          value={subTask}
          onChange={({ target }) => setSubtask(target.value)}
        />
      </label>
      <Button>Add</Button>
    </form>
  );
};

const SubTask = ({ subtask, complete, remove, edit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [task, setTask] = useState(subtask.title);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedSubTask = {
      ...subtask,
      title: task,
    };

    edit(updatedSubTask);
    setIsEditing(!isEditing);
  };

  const displaySubTaskEditForm = () => {
    return (
      <form onSubmit={handleEdit}>
        <Flex align="center" gap="3">
          <TextField.Root
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />
          <Button variant="ghost" type="submit">
            <CheckCircledIcon />
          </Button>
          <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
            <ArrowLeftIcon />
          </Button>
        </Flex>
      </form>
    );
  };

  return (
    <li>
      {isEditing ? (
        displaySubTaskEditForm()
      ) : (
        <Flex gap="3" align="center">
          <Text as="span">
            <input
              type="checkbox"
              onChange={() => complete(subtask)}
              defaultChecked={subtask.completed}
            />
            {subtask.title}
          </Text>
          <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
            <Pencil1Icon />
          </Button>
          <Button variant="ghost" onClick={() => remove(subtask.id)}>
            <TrashIcon />
          </Button>
        </Flex>
      )}
    </li>
  );
};

export default SubTasks;
