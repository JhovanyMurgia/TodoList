const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

/**
 * Task Routes - Routing layer (MVC)
 * 
 * Maps HTTP endpoints to controller methods.
 * Follows RESTful conventions.
 */

// GET /api/tasks - List all tasks
router.get('/', taskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
