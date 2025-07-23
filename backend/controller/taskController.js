const { getRecentTasks, addTask, completeTask } = require('../models/taskModel');

// Get recent tasks
async function getTasks(req, res) {
  try {
    const tasks = await getRecentTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error); 
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// Create a new task
async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    await addTask(title, description);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

// Mark a task as completed
async function markTaskComplete(req, res) {
  try {
    const { id } = req.params;
    await completeTask(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark task complete' });
  }
}

module.exports = {
  getTasks,
  createTask,
  markTaskComplete
};
