const { taskModel } = require('../models/taskModel');

/**
 * TaskController - Controller layer (MVC)
 * 
 * Handles HTTP request/response logic for task operations.
 * Delegates data operations to the Model and returns appropriate
 * HTTP status codes and JSON responses.
 */
const taskController = {
  /**
   * GET /api/tasks
   * Retrieve all tasks.
   */
  getAllTasks(req, res) {
    try {
      const tasks = taskModel.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  /**
   * POST /api/tasks
   * Create a new task.
   */
  createTask(req, res) {
    try {
      const { title, description } = req.body;
      const task = taskModel.create({ title, description });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * PUT /api/tasks/:id
   * Update an existing task.
   */
  updateTask(req, res) {
    try {
      const { id } = req.params;
      const task = taskModel.update(id, req.body);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * DELETE /api/tasks/:id
   * Delete a task by ID.
   */
  deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deleted = taskModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      res.status(200).json({ message: 'Tarefa removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = taskController;
