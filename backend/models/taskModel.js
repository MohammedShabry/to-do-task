const db = require('../db');

async function getRecentTasks() {
  const [rows] = await db.query("SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5");
  return rows;
}

async function addTask(title, description) {
  await db.query("INSERT INTO task (title, description) VALUES (?, ?)", [title, description]);
}

async function completeTask(id) {
  await db.query("UPDATE task SET completed = TRUE WHERE id = ?", [id]);
}

module.exports = { getRecentTasks, addTask, completeTask };
