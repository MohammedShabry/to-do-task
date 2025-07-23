jest.mock('../db', () => ({
  query: jest.fn(),
  end: jest.fn()
}));
const db = require('../db');
const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/tasks');

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

beforeAll(async () => {
  db.query.mockResolvedValue([[]]); // Mock delete
});

afterAll(() => db.end());

test("POST /tasks should add a task", async () => {
  db.query.mockResolvedValueOnce([{}]); // Mock insert
  const res = await request(app)
    .post('/tasks')
    .send({ title: "Test API", description: "From API" });
  expect(res.statusCode).toBe(201);
});

test("GET /tasks should return recent tasks", async () => {
  db.query.mockResolvedValueOnce([[{ id: 1, title: "Test API", description: "From API", completed: false }]]);
  const res = await request(app).get('/tasks');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test("PUT /tasks/:id/complete should mark as completed", async () => {
  db.query.mockResolvedValueOnce([[{ id: 1, title: "Test API", description: "From API", completed: false }]]); // getRecentTasks
  db.query.mockResolvedValueOnce([{}]); // completeTask
  const res = await request(app).get('/tasks');
  const id = res.body[0].id;
  const complete = await request(app).put(`/tasks/${id}/complete`);
  expect(complete.statusCode).toBe(204);
});
