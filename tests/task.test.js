const request = require('supertest');
const app = require('../src/app');
const { TaskModel, taskModel } = require('../src/models/taskModel');

describe('TaskModel', () => {
  let model;

  beforeEach(() => {
    model = new TaskModel();
  });

  test('cria uma tarefa valida', () => {
    const task = model.create({
      title: 'Estudar Node.js',
      description: 'Revisar rotas do Express'
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Estudar Node.js');
    expect(task.description).toBe('Revisar rotas do Express');
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();
  });

  test('nao cria tarefa sem titulo', () => {
    expect(() => model.create({ title: '' })).toThrow('O titulo e obrigatorio.');
    expect(() => model.create({})).toThrow('O titulo e obrigatorio.');
  });

  test('lista tarefas da mais recente para a mais antiga', () => {
    model.create({ title: 'Primeira' });
    model.create({ title: 'Segunda' });

    const tasks = model.findAll();

    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Segunda');
    expect(tasks[1].title).toBe('Primeira');
  });

  test('atualiza uma tarefa existente', () => {
    const task = model.create({ title: 'Rascunho' });
    const updated = model.update(task.id, {
      title: 'Tarefa revisada',
      completed: true
    });

    expect(updated.title).toBe('Tarefa revisada');
    expect(updated.completed).toBe(true);
    expect(updated.updatedAt).not.toBe(task.updatedAt);
  });

  test('remove uma tarefa', () => {
    const task = model.create({ title: 'Remover depois' });

    expect(model.delete(task.id)).toBe(true);
    expect(model.findById(task.id)).toBeNull();
    expect(model.count()).toBe(0);
  });
});

describe('API /api/tasks', () => {
  beforeEach(() => {
    taskModel.clear();
  });

  test('GET /api/tasks retorna lista vazia inicialmente', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/tasks cria tarefa', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Comprar caderno', description: 'Para a faculdade' });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe('Comprar caderno');
  });

  test('POST /api/tasks valida titulo obrigatorio', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ description: 'Sem titulo' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('O titulo e obrigatorio.');
  });

  test('PUT /api/tasks/:id atualiza tarefa', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Ler contrato da API' });

    const response = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('PUT /api/tasks/:id retorna 404 quando nao encontra', async () => {
    const response = await request(app)
      .put('/api/tasks/id-inexistente')
      .send({ completed: true });

    expect(response.status).toBe(404);
  });

  test('DELETE /api/tasks/:id remove tarefa', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Apagar esta tarefa' });

    const response = await request(app).delete(`/api/tasks/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tarefa removida com sucesso.');
  });

  test('GET /api/health informa saude da aplicacao', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.timestamp).toBeDefined();
  });
});
