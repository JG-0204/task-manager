import { useContext } from 'react';

import {
  Dialog,
  Container,
  Select,
  Text,
  TextArea,
  TextField,
  Flex,
  Button,
} from '@radix-ui/themes';

import TasksContext from './taskContext';

const TaskEditForm = ({
  task,
  state,
  setTitle,
  setDescription,
  setDue,
  setPriority,
}) => {
  const { updateTask } = useContext(TasksContext);
  const { title, description, priority, due } = state;

  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleDescriptionChange = ({ target }) => setDescription(target.value);
  const handlePriorityChange = (value) => setPriority(value);
  const handleDueDateChange = ({ target }) => setDue(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      task: title,
      description: description,
      dueDate: due,
      priority: priority,
    };

    updateTask(updatedTask);
  };

  const handleCancel = () => {
    setTitle(task.task);
    setDue(task.dueDate);
    setDescription(task.description);
    setPriority(task.priority);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="450px" align="center" py="3">
        <Flex gap="3" direction="column">
          <label>
            <Text as="div">Title</Text>
            <TextField.Root value={title} onChange={handleTitleChange} />
          </label>
          <label>
            <Text as="div">Description</Text>
            <TextArea value={description} onChange={handleDescriptionChange} />
          </label>
          <label>
            <Text as="span">Due: </Text>
            <input value={due} type="date" onChange={handleDueDateChange} />
          </label>

          <Flex align="center" gap="1">
            <Text as="span">Priority: </Text>
            <Select.Root
              defaultValue={priority}
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
              <Button color="ruby" onClick={handleCancel}>
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Container>
    </form>
  );
};

export default TaskEditForm;
