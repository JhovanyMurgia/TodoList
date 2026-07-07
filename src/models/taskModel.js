const { v4: uuidv4 } = require('uuid');

let lastTimestamp = 0;

function nowISO() {
  const ms = Math.max(Date.now(), lastTimestamp + 1);
  lastTimestamp = ms;
  return new Date(ms).toISOString();
}

class TaskModel {
  constructor() {
    this.tasks = [];
  }

  create(data) {
    this.validateTitle(data.title);
    this.validateDescription(data.description);

    const now = nowISO();
    const task = {
      id: uuidv4(),
      title: data.title.trim(),
      description: data.description ? data.description.trim() : '',
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    this.tasks.push(task);
    return task;
  }

  findAll() {
    return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  findById(id) {
    return this.tasks.find((task) => task.id === id) || null;
  }

  update(id, data) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    const task = { ...this.tasks[index] };

    if (data.title !== undefined) {
      this.validateTitle(data.title);
      task.title = data.title.trim();
    }

    if (data.description !== undefined) {
      this.validateDescription(data.description);
      task.description = data.description.trim();
    }

    if (data.completed !== undefined) {
      task.completed = Boolean(data.completed);
    }

    task.updatedAt = nowISO();
    this.tasks[index] = task;
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  count() {
    return this.tasks.length;
  }

  clear() {
    this.tasks = [];
  }

  validateTitle(title) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('O titulo e obrigatorio.');
    }

    if (title.trim().length > 100) {
      throw new Error('O titulo deve ter no maximo 100 caracteres.');
    }
  }

  validateDescription(description) {
    if (description && description.trim().length > 500) {
      throw new Error('A descricao deve ter no maximo 500 caracteres.');
    }
  }
}

const taskModel = new TaskModel();

module.exports = { TaskModel, taskModel };
