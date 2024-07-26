const url = 'http://localhost:8080/api/tasks';

const getAllTasks = async () => {
  const req = await fetch(url);

  const reqData = req.json();

  return reqData;
};

const createNewTask = async (newTask) => {
  const req = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newTask),
  });

  const reqData = req.json();

  return reqData;
};

export default { getAllTasks, createNewTask };
