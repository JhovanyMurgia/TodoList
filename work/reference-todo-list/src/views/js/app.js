/**
 * TODO List — Frontend Application Logic
 * Architecture: MVC (View Layer - Client-Side)
 *
 * Handles:
 * - CRUD operations via Fetch API
 * - UI rendering and updates
 * - Theme toggling
 * - Toast notifications
 */

const API_URL = '/api/tasks';

// --- State ---
let tasks = [];
let currentFilter = 'all';

// --- DOM Elements ---
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-description');
const titleCount = document.getElementById('title-count');
const descCount = document.getElementById('desc-count');
const submitBtn = document.getElementById('submit-btn');
const taskListEl = document.getElementById('task-list');
const emptyStateEl = document.getElementById('empty-state');
const taskCountEl = document.getElementById('task-count');
const themeToggle = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================
// API Functions
// ============================================

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Erro ao carregar tarefas');
    tasks = await res.json();
    renderTasks();
  } catch (error) {
    showToast('Erro ao carregar tarefas.', 'error');
    console.error(error);
  }
}

async function createTask(data) {
  try {
    submitBtn.disabled = true;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao criar tarefa');
    }

    const task = await res.json();
    tasks.unshift(task);
    renderTasks();
    showToast('Tarefa criada com sucesso!', 'success');
    return task;
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    return null;
  } finally {
    submitBtn.disabled = false;
  }
}

async function updateTask(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao atualizar tarefa');
    }

    const updated = await res.json();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks[index] = updated;
    renderTasks();
    return updated;
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    return null;
  }
}

async function deleteTask(id) {
  try {
    // Animate removal first
    const card = document.querySelector(`[data-task-id="${id}"]`);
    if (card) {
      card.classList.add('removing');
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao remover tarefa');
    }

    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    showToast('Tarefa removida!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    // Re-fetch to restore UI state
    await fetchTasks();
  }
}

// ============================================
// Rendering
// ============================================

function renderTasks() {
  const filtered = getFilteredTasks();

  taskCountEl.textContent = tasks.length;

  if (filtered.length === 0) {
    taskListEl.innerHTML = '';
    emptyStateEl.hidden = false;
    return;
  }

  emptyStateEl.hidden = true;

  taskListEl.innerHTML = filtered.map(task => {
    const isCompleted = task.completed;

    const cardClasses = [
      'task-card',
      isCompleted ? 'completed' : ''
    ].filter(Boolean).join(' ');

    const checkboxClass = `task-checkbox${isCompleted ? ' checked' : ''}`;

    return `
      <div class="${cardClasses}" data-task-id="${task.id}">
        <button
          class="${checkboxClass}"
          onclick="handleToggleComplete('${task.id}', ${!isCompleted})"
          title="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}"
          aria-label="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}"
        ></button>
        <div class="task-body">
          <div class="task-title">${escapeHtml(task.title)}</div>
          ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
          <div class="task-meta">
            <span class="task-date">📅 ${formatDate(task.createdAt)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button
            class="btn-delete"
            onclick="handleDelete('${task.id}')"
            title="Remover tarefa"
            aria-label="Remover tarefa"
          >🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

function getFilteredTasks() {
  switch (currentFilter) {
    case 'pending':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    default:
      return tasks;
  }
}

// ============================================
// Event Handlers
// ============================================

function handleToggleComplete(id, completed) {
  updateTask(id, { completed });
}

function handleDelete(id) {
  deleteTask(id);
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();

  if (!title) {
    showToast('O título é obrigatório.', 'error');
    taskTitleInput.focus();
    return;
  }

  const result = await createTask({ title, description });
  if (result) {
    taskForm.reset();
    titleCount.textContent = '0';
    descCount.textContent = '0';
    taskTitleInput.focus();
  }
});

// Character counters
taskTitleInput.addEventListener('input', () => {
  titleCount.textContent = taskTitleInput.value.length;
});

taskDescInput.addEventListener('input', () => {
  descCount.textContent = taskDescInput.value.length;
});

// Filter tabs
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================
// Utilities
// ============================================

function showToast(message, type = 'success') {
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================
// Initialization
// ============================================

function init() {
  // Restore theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Load tasks
  fetchTasks();
}

init();
