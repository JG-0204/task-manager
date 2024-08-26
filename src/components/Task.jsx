import { useState, useContext } from 'react';
import { formatDistance } from 'date-fns';

import { Card, Text, Heading, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import TasksContext from './TasksContext';

import TaskInfoDialog from './TaskInfoDialog';

const Task = ({ task }) => {
  const { deleteTask, toggleStatus } = useContext(TasksContext);

  const [taskName, setTaskName] = useState(task.task);
  const [taskDesc, setTaskDesc] = useState(task.description);
  const [taskDue, setTaskDue] = useState(task.dueDate);
  const [taskPrio, setTaskPrio] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleStatusChange = () => {
    const statuses = ['pending', 'in-progress', 'completed'];
    const id = statuses.findIndex((status) => status === taskStatus);
    const status = statuses[id + 1];

    setTaskStatus(status);

    if (id === 2) {
      setTaskStatus(statuses[0]);
      toggleStatus(statuses[0], task.id);
      return;
    }

    toggleStatus(status, task.id);
  };

  return (
    <li>
      <Card size="4" style={setBorderByPriority(taskPrio)}>
        <Flex direction="column" gap="2">
          <Heading size="3" truncate>
            {taskName.toUpperCase()}
          </Heading>
          <Text as="div" translate="yes">
            {taskDesc}
          </Text>
          <Text as="div">
            {taskDue === 'none'
              ? 'No due date'
              : 'due in ' + getDueDate(task.dateAdded, taskDue)}
          </Text>
          <Flex gap="2" justify="center">
            <TaskInfoDialog
              task={task}
              state={{
                title: taskName,
                description: taskDesc,
                due: taskDue,
                priority: taskPrio,
                status: taskStatus,
              }}
              setTitle={setTaskName}
              setDescription={setTaskDesc}
              setDue={setTaskDue}
              setPriority={setTaskPrio}
            />
            <Button
              onClick={() => deleteTask(task.id)}
              color="crimson"
              variant="soft"
            >
              Remove <TrashIcon />
            </Button>
            <Button onClick={handleStatusChange} color="iris" variant="soft">
              {taskStatus === 'pending' ? 'Get Task' : 'Complete'}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </li>
  );
};

const getDueDate = (addDate, dueDate) => {
  if (dueDate === 'none') {
    return dueDate;
  }

  const due = formatDistance(addDate, dueDate);
  return due;
};

const setBorderByPriority = (priority) => {
  switch (priority) {
    case 'high':
      return { borderLeft: '3px solid red' };
    case 'medium':
      return { borderLeft: '3px solid orange' };
    case 'low':
      return { borderLeft: '3px solid blue' };
    default:
      return '';
  }
};

export default Task;
