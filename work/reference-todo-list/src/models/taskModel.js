const { v4: uuidv4 } = require('uuid');

/**
 * Monotonic ISO-8601 timestamp.
 *
 * new Date().toISOString() only has millisecond resolution, so two operations
 * within the same millisecond produce identical timestamps. That breaks both
 * ordering by createdAt and the "updatedAt changed" invariant. We keep a module
 * level high-water mark so each call returns a strictly greater ISO timestamp.
 */
let lastTimestamp = 0;
function nowISO() {
  const ms = Math.max(Date.now(), lastTimestamp + 1);
  lastTimestamp = ms;
  return new Date(ms).toISOString();
}

/**
 * TaskModel - Model layer (MVC)
 * 
 * Manages task data in-memory using a JavaScript array.
 * All CRUD operations are handled here.
 * 
 * Design Decision: Using a class with an internal array instead of
 * a module-level variable allows for easy testing (new instance per test).
 */
class TaskModel {
  constructor() {
    this.tasks = [];
  }

  /**
   * Create a new task.
   * @param {Object} data - Task data { title, description? }
   * @returns {Object} The created task with generated fields
   * @throws {Error} If title is missing or invalid
   */
  create(data) {
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      throw new Error('O título é obrigatório.');
    }

    if (data.title.trim().length > 100) {
      throw new Error('O título deve ter no máximo 100 caracteres.');
    }

    if (data.description && data.description.length > 500) {
      throw new Error('A descrição deve ter no máximo 500 caracteres.');
    }

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

  /**
   * Retrieve all tasks.
   * @returns {Array} All tasks sorted by creation date (newest first)
   */
  findAll() {
    return [...this.tasks].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  /**
   * Find a task by its ID.
   * @param {string} id - Task UUID
   * @returns {Object|null} The task or null if not found
   */
  findById(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Update an existing task.
   * @param {string} id - Task UUID
   * @param {Object} data - Fields to update { title?, description?, completed? }
   * @returns {Object|null} The updated task or null if not found
   * @throws {Error} If validation fails
   */
  update(id, data) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;

    // Immutable update: work on a copy so references returned by earlier
    // create()/findById() calls stay a snapshot of the pre-update state.
    const task = { ...this.tasks[index] };

    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.trim().length === 0) {
        throw new Error('O título é obrigatório.');
      }
      if (data.title.trim().length > 100) {
        throw new Error('O título deve ter no máximo 100 caracteres.');
      }
      task.title = data.title.trim();
    }

    if (data.description !== undefined) {
      if (data.description.length > 500) {
        throw new Error('A descrição deve ter no máximo 500 caracteres.');
      }
      task.description = data.description.trim();
    }

    if (data.completed !== undefined) {
      task.completed = Boolean(data.completed);
    }

    task.updatedAt = nowISO();
    this.tasks[index] = task;
    return task;
  }

  /**
   * Delete a task by its ID.
   * @param {string} id - Task UUID
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }


  /**
   * Get the total number of tasks.
   * @returns {number}
   */
  count() {
    return this.tasks.length;
  }
}

// Singleton instance for the application
const taskModel = new TaskModel();

module.exports = { TaskModel, taskModel };
