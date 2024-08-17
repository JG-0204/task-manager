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
  TextField,
  Container,
  TextArea,
  Select,
} from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import TasksContext from './taskContext';

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
  const { updateTask, deleteTask, toggleStatus } = useContext(TasksContext);

  const [taskName, setTaskName] = useState(task.task);
  const [taskDesc, setTaskDesc] = useState(task.description);
  const [taskDue, setTaskDue] = useState(task.dueDate);
  const [taskPrio, setTaskPrio] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);

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
  };

  const handleCancel = () => {
    setTaskName(task.task);
    setTaskDue(task.dueDate);
    setTaskDesc(task.description);
    setTaskPrio(task.priority);
  };

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

  const handleTitleChange = ({ target }) => setTaskName(target.value);
  const handleDescriptionChange = ({ target }) => setTaskDesc(target.value);
  const handlePriorityChange = (value) => setTaskPrio(value);
  const handleDueDateChange = ({ target }) => setTaskDue(target.value);

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

                  <form onSubmit={handleSubmit}>
                    <Container maxWidth="450px" align="center" py="3">
                      <Flex gap="3" direction="column">
                        <label>
                          <Text as="div">Title</Text>
                          <TextField.Root
                            value={taskName}
                            onChange={handleTitleChange}
                          />
                        </label>
                        <label>
                          <Text as="div">Description</Text>
                          <TextArea
                            value={taskDesc}
                            onChange={handleDescriptionChange}
                          />
                        </label>
                        <label>
                          <Text as="span">Due: </Text>
                          <input
                            value={taskDue}
                            type="date"
                            onChange={handleDueDateChange}
                          />
                        </label>

                        <Flex align="center" gap="1">
                          <Text as="span">Priority: </Text>
                          <Select.Root
                            defaultValue={taskPrio}
                            onValueChange={handlePriorityChange}
                          >
                            <Select.Trigger />
                            <Select.Content>
                              <Select.Group>
                                <Select.Item value="none">None</Select.Item>
                                <Select.Item value="low">Low</Select.Item>
                                <Select.Item value="medium">Medium</Select.Item>
                                <Select.Item value="high">High</Select.Item>
                              </Select.Group>
                            </Select.Content>
                          </Select.Root>
                        </Flex>
                        <Flex>
                          <Dialog.Close>
                            <Button type="submit" color="blue">
                              Save
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button onClick={handleCancel} color="ruby">
                              Cancel
                            </Button>
                          </Dialog.Close>
                        </Flex>
                      </Flex>
                    </Container>
                  </form>
                </Dialog.Content>
              </Dialog.Root>

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
