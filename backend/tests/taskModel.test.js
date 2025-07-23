jest.mock('../db', () => ({
  query: jest.fn(),
  end: jest.fn()
}));
const db = require('../db');
const { getRecentTasks, addTask, completeTask } = require('../models/taskModel');

beforeAll(async () => {
  db.query.mockResolvedValue([[]]); // Mock empty result for delete
});

afterAll(() => db.end());

test("should add a task to the database", async () => {
  db.query.mockResolvedValueOnce([{}]); // Mock insert
  db.query.mockResolvedValueOnce([[{ id: 1, title: "Test Title", description: "Test Description", completed: false }]]);
  await addTask("Test Title", "Test Description");
  const tasks = await getRecentTasks();
  expect(tasks.length).toBeGreaterThan(0);
  expect(tasks[0].title).toBe("Test Title");
});

test("should mark a task as completed", async () => {
  db.query.mockResolvedValueOnce([[{ id: 1, completed: false }]]); // Select incomplete
  db.query.mockResolvedValueOnce([{}]); // Update
  db.query.mockResolvedValueOnce([[{ id: 1, completed: 1 }]]); // Select after update
  const [rows] = await db.query("SELECT * FROM task WHERE completed = FALSE LIMIT 1");
  const task = rows[0];
  await completeTask(task.id);
  const [check] = await db.query("SELECT * FROM task WHERE id = ?", [task.id]);
  expect(check[0].completed).toBe(1);
});
