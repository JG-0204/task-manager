import { useState, useContext } from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import {
  Card,
  Text,
  Heading,
  Button,
  Flex,
  Tooltip,
  Separator,
  Dialog,
  Badge,
} from '@radix-ui/themes';
import {
  TrashIcon,
  CalendarIcon,
  PaperPlaneIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';

import TasksContext from './TasksContext';

import TaskInfoDialog from './TaskInfoDialog';

import './Task.css';

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

  // Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, placeat!

  return (
    <Card size="4" className="task-card">
      <Flex direction="column" p="0">
        <div className="wrapper">
          <Heading size="3" truncate className="task-heading">
            {taskName}
          </Heading>
          <Separator size="4" mt="4" mb="2" />
          <Text as="div" className="task-description" truncate>
            {taskDesc}
          </Text>
          <Text as="div" className="task-due">
            <CalendarIcon /> {getDueDate(taskDue)}
          </Text>
          {showPriorityBadge(taskPrio)}
          <Tooltip content="Remove task?">
            <Button
              className="remove-button"
              onClick={() => deleteTask(task.id)}
              color="crimson"
              variant="soft"
            >
              <TrashIcon />
            </Button>
          </Tooltip>
          {taskStatus === 'pending' ? (
            <Tooltip content="Start task">
              <Button
                className="start-button"
                onClick={handleStatusChange}
                color="iris"
                variant="soft"
              >
                <PaperPlaneIcon />
              </Button>
            </Tooltip>
          ) : (
            <Flex gap="2" justify="center">
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant="soft" className="open-task-button">
                    <Tooltip content="Open Task">
                      <ReaderIcon />
                    </Tooltip>
                  </Button>
                </Dialog.Trigger>

                <TaskInfoDialog
                  task={task}
                  state={{
                    title: taskName,
                    description: taskDesc,
                    due: taskDue,
                    priority: taskPrio,
                    status: taskStatus,
                  }}
                  toggleStatus={handleStatusChange}
                  setTitle={setTaskName}
                  setDescription={setTaskDesc}
                  setDue={setTaskDue}
                  setPriority={setTaskPrio}
                />
              </Dialog.Root>
            </Flex>
          )}
        </div>
      </Flex>
    </Card>
  );
};

const getDueDate = (dueDate) => {
  const due = formatDistanceToNow(dueDate);

  const currDate = format(new Date(), 'yyyy-MM-dd');
  if (format(dueDate, 'yyyy-MM-dd') < currDate) return `${due} passed it's due`;
  return `due in ${due}`;
};

const showPriorityBadge = (priority) => {
  if (priority === 'high')
    return (
      <Badge size="2" color="ruby">
        {priority + '-priority'}
      </Badge>
    );
  if (priority === 'medium')
    return (
      <Badge size="2" color="teal">
        {priority + '-priority'}
      </Badge>
    );
  if (priority === 'low')
    return (
      <Badge size="2" color="iris">
        {priority + '-priority'}
      </Badge>
    );
  return (
    <Badge size="2" color="gray">
      no-priority
    </Badge>
  );
};

export default Task;
