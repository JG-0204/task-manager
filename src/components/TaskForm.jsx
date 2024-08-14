import { useState, useContext } from 'react';
import TasksContext from './taskContext';
import {
  Box,
  Button,
  Flex,
  Card,
  Heading,
  TextField,
  Text,
  TextArea,
  Select,
} from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

const TaskForm = () => {
  const { addTask } = useContext(TasksContext);

  const [isEnabled, setIsEnabled] = useState(true);

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
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

    // toggle form
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      {!isEnabled ? (
        <Box p="4" maxWidth="500px">
          <Card>
            <form onSubmit={handleSubmit}>
              <Heading as="h3">New Task</Heading>
              <Flex direction="column" justify="center" gap="4" px="2" py="3">
                <label>
                  <Text as="div">Title: </Text>
                  <TextField.Root
                    defaultValue={task}
                    placeholder="create a simple task manager app"
                    onChange={({ target }) => setTask(target.value)}
                  />
                </label>
                <label>
                  <Text as="div">Description: </Text>
                  <TextArea
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    placeholder="a task manager created with react"
                  />
                </label>

                <label>
                  <Text as="span">Due: </Text>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={({ target }) => setDueDate(target.value)}
                  />
                </label>

                <label>
                  <Flex align="center" gap="1">
                    <Text as="span">Priority: </Text>
                    <Select.Root
                      defaultValue="none"
                      onValueChange={(value) => setPriority(value)}
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
                </label>
                <Button type="submit" size="3">
                  Create new task
                </Button>
              </Flex>
            </form>
          </Card>
        </Box>
      ) : (
        <Box p="4">
          <Button onClick={() => setIsEnabled(!isEnabled)} size="4">
            Add new task <PlusIcon />
          </Button>
        </Box>
      )}
    </>
  );
};

export default TaskForm;
