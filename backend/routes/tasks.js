
const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  markTaskComplete
} = require('../controller/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id/complete', markTaskComplete);

module.exports = router;
