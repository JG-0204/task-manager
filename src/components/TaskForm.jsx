import { useState, useContext } from 'react';

import {
  Button,
  Card,
  TextField,
  TextArea,
  Separator,
  Tooltip,
} from '@radix-ui/themes';
import { PlusIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';

import { format } from 'date-fns';

import TasksContext from './TasksContext';

import './TaskForm.css';

const TaskForm = ({ status }) => {
  const currDate = getCurrDate();

  const { addTask } = useContext(TasksContext);

  const [isEnabled, setIsEnabled] = useState(true);

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('none');
  const [dueDate, setDueDate] = useState(currDate);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(typeof dueDate);

    const newTask = {
      task,
      description: !description ? 'No description added.' : description,
      priority,
      dueDate,
      status,
    };

    addTask(newTask);

    setTask('');
    setDescription('');

    // toggle form
    setIsEnabled(!isEnabled);
  };

  const handleExit = () => {
    setTask('');
    setDescription('');
    setPriority('none');
    setDueDate('none');
    setIsEnabled(!isEnabled);
  };

  return (
    <div>
      {!isEnabled ? (
        <Card className="form-card">
          <Form.Root onSubmit={handleSubmit} className="form-root">
            <div className="form-heading">
              <h3>Add a new task</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                amet.
              </p>
            </div>
            <Separator size="4" my="2" />
            <Form.Field name="task" className="form-field">
              <div className="row-container">
                <Form.Label className="form-label">Task </Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="form-message"
                ></Form.Message>
              </div>
              <Form.Control asChild>
                <TextField.Root
                  defaultValue={task}
                  placeholder="create a simple task manager app"
                  onChange={({ target }) => setTask(target.value)}
                  autoFocus
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="description" className="form-field">
              <Form.Label className="form-label">Description </Form.Label>
              <Form.Control asChild>
                <TextArea
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  placeholder="a task manager created with react"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="due" className="form-field">
              <div className="field-wrapper">
                <Form.Label className="form-label">Due </Form.Label>
                <Form.Control asChild>
                  <input
                    type="date"
                    min={currDate}
                    value={dueDate}
                    onChange={({ target }) => setDueDate(target.value)}
                  />
                </Form.Control>
              </div>
            </Form.Field>
            <Form.Field name="priority" className="form-field">
              <div className="field-wrapper">
                <Form.Label className="form-label">Priority </Form.Label>
                <Form.Control asChild>
                  <select
                    name="priority"
                    id="priority"
                    onChange={({ target }) => setPriority(target.value)}
                  >
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </Form.Control>
              </div>
            </Form.Field>
            <Separator size="4" my="2" />
            <Form.Submit asChild>
              <div className="button-wrapper">
                <Button size="3" variant="outline" className="add-button">
                  Add <PlusIcon />
                </Button>
                <Button
                  variant="outline"
                  size="3"
                  className="cancel-button"
                  onClick={handleExit}
                >
                  Cancel <Cross2Icon />
                </Button>
              </div>
            </Form.Submit>
          </Form.Root>
        </Card>
      ) : (
        <Tooltip content="Create new task">
          <Button
            onClick={() => setIsEnabled(!isEnabled)}
            size="4"
            variant="soft"
          >
            <PlusIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

const getCurrDate = () => format(new Date(), 'yyyy-MM-dd');

export default TaskForm;
