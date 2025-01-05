const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//Endpoint 1. Add a Task to the Task List

app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);

  tasks.push({ taskId: taskId, text: text, priority: priority });

  res.json({ tasks });
});

//Endpoint 2. Read All Tasks in the Task List

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

//Endpoint 3. Sort Tasks by Priority

app.get('/tasks/sort-by-priority', (req, res) => {
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortedTasks });
});

//Endpoint 4. Edit Task Priority

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);

  tasks = tasks.map((task) =>
    task.taskId === taskId ? { ...task, priority: priority } : task
  );

  res.json({ tasks });
});

//Endpoint 5. Edit/Update Task Text

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;

  tasks = tasks.map((task) =>
    task.taskId === taskId ? { ...task, text: text } : task
  );

  res.json({ tasks });
});

//Endpoint 6. Delete a Task from the Task List

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);

  tasks = tasks.filter((task) => task.taskId !== taskId);

  res.json({ tasks });
});

//Endpoint 7. Filter Tasks by Priority

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);

  const filteredTasks = tasks.filter((task) => task.priority === priority);

  res.json({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
