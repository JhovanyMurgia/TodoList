const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');
const formMessage = document.querySelector('#formMessage');
const totalCount = document.querySelector('#totalCount');
const pendingCount = document.querySelector('#pendingCount');
const doneCount = document.querySelector('#doneCount');
const refreshButton = document.querySelector('#refreshButton');
const themeToggle = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('#themeIcon');

const storageKey = 'todo-list-theme';

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  themeIcon.textContent = theme === 'dark' ? 'Claro' : 'Escuro';
  localStorage.setItem(storageKey, theme);
}

function loadTheme() {
  applyTheme(localStorage.getItem(storageKey) || 'light');
}

function setMessage(message) {
  formMessage.textContent = message;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Nao foi possivel concluir a operacao.');
  }

  return data;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value));
}

function updateSummary(tasks) {
  const done = tasks.filter((task) => task.completed).length;
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.length - done;
  doneCount.textContent = done;
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  emptyState.classList.toggle('hidden', tasks.length > 0);
  updateSummary(tasks);

  tasks.forEach((task) => {
    const item = document.createElement('article');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.className = 'task-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Marcar ${task.title} como concluida`);
    checkbox.addEventListener('change', () => toggleTask(task));

    const content = document.createElement('div');
    content.className = 'task-content';
    content.innerHTML = `
      <h3></h3>
      <p></p>
      <small>Criada em ${formatDate(task.createdAt)}</small>
    `;
    content.querySelector('h3').textContent = task.title;
    content.querySelector('p').textContent = task.description || 'Sem descricao.';

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    actions.appendChild(deleteButton);
    item.append(checkbox, content, actions);
    taskList.appendChild(item);
  });
}

async function loadTasks() {
  try {
    const tasks = await requestJson('/api/tasks');
    renderTasks(tasks);
  } catch (error) {
    setMessage(error.message);
  }
}

async function createTask(event) {
  event.preventDefault();
  setMessage('');

  const formData = new FormData(taskForm);

  try {
    await requestJson('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description')
      })
    });

    taskForm.reset();
    await loadTasks();
  } catch (error) {
    setMessage(error.message);
  }
}

async function toggleTask(task) {
  try {
    await requestJson(`/api/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !task.completed })
    });
    await loadTasks();
  } catch (error) {
    setMessage(error.message);
  }
}

async function deleteTask(id) {
  try {
    await requestJson(`/api/tasks/${id}`, { method: 'DELETE' });
    await loadTasks();
  } catch (error) {
    setMessage(error.message);
  }
}

taskForm.addEventListener('submit', createTask);
refreshButton.addEventListener('click', loadTasks);
themeToggle.addEventListener('click', () => {
  applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
});

loadTheme();
loadTasks();
