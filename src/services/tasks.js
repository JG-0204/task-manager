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

  const reqData = await req.json();

  return reqData;
};

const deleteTask = async (id) => {
  const joinedUrl = `${url}/${id}`;

  const req = await fetch(joinedUrl, {
    method: 'DELETE',
  });

  if (!req.ok) {
    throw new Error(`HTTP error: ${req.status}`);
  }
};

const updateTask = async (updatedTask) => {
  const joinedUrl = `${url}/${updatedTask.id}`;

  const req = await fetch(joinedUrl, {
    method: 'PUT',
    body: JSON.stringify(updatedTask),
  });

  if (!req.ok) {
    throw new Error(`HTTP error: ${req.status}`);
  }
};

export default { getAllTasks, createNewTask, deleteTask, updateTask };
