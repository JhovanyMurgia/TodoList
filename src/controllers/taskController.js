const { taskModel } = require('../models/taskModel');

const taskController = {
  getAllTasks(req, res) {
    try {
      res.status(200).json(taskModel.findAll());
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  createTask(req, res) {
    try {
      const task = taskModel.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTask(req, res) {
    try {
      const task = taskModel.update(req.params.id, req.body);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa nao encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  deleteTask(req, res) {
    try {
      const deleted = taskModel.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Tarefa nao encontrada.' });
      }

      return res.status(200).json({ message: 'Tarefa removida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = taskController;
