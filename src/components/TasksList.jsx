import { useContext } from 'react';
import { Flex, Grid } from '@radix-ui/themes';

import './TasksList.css';

import TasksContext from './TasksContext';

import Task from './Task';
import TaskForm from './TaskForm';

const TasksList = () => {
  const { tasks } = useContext(TasksContext);

  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <ul className="tasks-list">
      <Grid width="auto" columns="3" justify="center" flow="row" height="100%">
        <Flex direction="column" align="center" gap="3">
          <div className="status-heading-container status-pending">
            <h2 className="status-heading">Pending</h2>
          </div>

          <Flex
            direction="column"
            gap="3"
            overflow="auto"
            maxHeight="740px"
            width="80%"
          >
            {pendingTasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </Flex>
          <TaskForm status={'pending'} />
        </Flex>
        <Flex
          direction="column"
          align="center"
          gap="3"
          style={{
            backgroundColor: 'rgba(240, 233, 233, .3)',
          }}
        >
          <div className="status-heading-container status-inProgress">
            <h2 className="status-heading">In-Progress</h2>
          </div>
          <Flex direction="column" gap="3" overflow="auto" width="80%">
            {inProgressTasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </Flex>
          <TaskForm status={'in-progress'} />
        </Flex>
        <Flex direction="column" align="center" gap="3">
          <div className="status-heading-container status-completed">
            <h2 className="status-heading">Completed</h2>
          </div>
          <Flex
            direction="column"
            gap="3"
            overflow="auto"
            width="80%"
            maxHeight="740px"
          >
            {completedTasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </Flex>
          <TaskForm status={'completed'} />
        </Flex>
      </Grid>
    </ul>
  );
};

export default TasksList;
