import { Dialog, Button, Flex, Text, Box, Badge } from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';

import TaskEditForm from './TaskEditForm';
import SubTasks from './SubTasks';

const TaskInfoDialog = ({
  task,
  state,
  setTitle,
  setDue,
  setDescription,
  setPriority,
}) => {
  const { title, description, due, priority, status } = state;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Open Task</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="650px">
        <Dialog.Title>
          <Flex align="center" justify="between">
            <Text as="div" size="4">
              {title}
            </Text>
            {showStatus(status)}
          </Flex>
        </Dialog.Title>
        <Dialog.Description>
          <Box as="span">
            <Text as="span">Description</Text>
            <br />
            <Text as="span" mb="3">
              {description}
            </Text>
          </Box>
        </Dialog.Description>
        <SubTasks task={task} />
        <TaskEditForm
          task={task}
          state={{
            title,
            due,
            priority,
            description,
          }}
          setTitle={setTitle}
          setDescription={setDescription}
          setDue={setDue}
          setPriority={setPriority}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
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

export default TaskInfoDialog;
