import { useContext, useState } from 'react';
import { formatDistance } from 'date-fns';
import {
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Badge,
  Button,
  Dialog,
} from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import TasksContext from './taskContext';
import SubTasks from './SubTasks';
import TaskEditForm from './TaskEditForm';

const TasksList = () => {
  const { tasks } = useContext(TasksContext);

  return (
    <ul style={{ listStyleType: 'none' }}>
      <Flex wrap="wrap" justify="center" gap="5">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </Flex>
    </ul>
  );
};

const Task = ({ task }) => {
  const { deleteTask, toggleStatus, refreshSubTasks } =
    useContext(TasksContext);

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

  const handleSubTaskChange = (subtasks) => refreshSubTasks(subtasks, task.id);

  const displayTaskInfoDialog = () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="cyan" variant="soft">
            Edit <Pencil1Icon />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="650px">
          <Dialog.Title>
            <Flex align="center" justify="between">
              <Text as="div" size="4">
                {taskName}
              </Text>
              {showStatus(taskStatus)}
            </Flex>
          </Dialog.Title>
          <Dialog.Description>
            <Box as="span">
              <Text as="span">Description</Text>
              <br />
              <Text as="span" mb="3">
                {taskDesc}
              </Text>
            </Box>
          </Dialog.Description>
          <SubTasks subtasks={task.subTasks} refresh={handleSubTaskChange} />
          <TaskEditForm
            task={task}
            state={{
              title: taskName,
              due: taskDue,
              priority: taskPrio,
              description: taskDesc,
            }}
            setTitle={setTaskName}
            setDescription={setTaskDesc}
            setDue={setTaskDue}
            setPriority={setTaskPrio}
          />
        </Dialog.Content>
      </Dialog.Root>
    );
  };

  return (
    <li>
      <Box maxWidth="319.4px">
        <Card size="3" style={setBorderByPriority(taskPrio)}>
          <Flex direction="column" gap="2">
            <Heading size="3" truncate>
              Task: {taskName}
            </Heading>
            <Text as="div">Due: {getDueDate(task.dateAdded, taskDue)}</Text>
            <Text as="div">Status: {showStatus(taskStatus)}</Text>
            <Flex gap="2">
              {displayTaskInfoDialog()}
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
      </Box>
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

const showStatus = (status) => {
  if (status === 'pending')
    return (
      <Badge size="2" color="ruby">
        {status}
      </Badge>
    );
  if (status === 'in-progress')
    return (
      <Badge size="2" color="teal">
        {status}
      </Badge>
    );
  return (
    <Badge size="2" color="blue">
      {status}
    </Badge>
  );
};

const setBorderByPriority = (priority) => {
  switch (priority) {
    case 'high':
      return { borderLeft: '7px solid red' };
    case 'medium':
      return { borderLeft: '7px solid orange' };
    case 'low':
      return { borderLeft: '7px solid blue' };
    default:
      return '';
  }
};

export default TasksList;
