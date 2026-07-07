# Tasks: TODO List

**Input**: Documentos de design em `docs/specs/` e `docs/contracts/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api-v1.md

## Convenções

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência).
- **Testes vêm antes da implementação** (Princípio IV — TDD).
- Estado: `[X]` concluído.

## Phase 3.1: Setup

- [X] T001 Inicializar projeto Node.js (`package.json`, scripts `start`/`dev`/`test`).
- [X] T002 [P] Instalar dependências: `express`, `uuid`, `cors`, `jest`, `supertest`.

## Phase 3.2: Tests First (TDD)

- [X] T003 [P] Testes unitários do Model (`create`, `findAll`, `findById`, `update`,
  `delete`, `count`) em `tests/task.test.js`.
- [X] T004 [P] Testes de integração dos endpoints (`GET/POST/PUT/DELETE /api/tasks`,
  `GET /api/health`) em `tests/task.test.js`.

## Phase 3.3: Core Implementation

- [X] T005 [P] Model `TaskModel` com validações VR-01..VR-04 em `src/models/taskModel.js`.
- [X] T006 Controller `taskController` (getAll/create/update/delete) em
  `src/controllers/taskController.js`.
- [X] T007 Rotas REST em `src/routes/taskRoutes.js`.
- [X] T008 View (formulário, lista, tema claro/escuro) em `src/views/`.

## Phase 3.4: Integration

- [X] T009 Montar Express, middlewares (`cors`, `json`), estáticos e rotas em `src/app.js`.
- [X] T010 Health check `GET /api/health` e fallback para `index.html`.

## Phase 3.5: Polish

- [X] T011 [P] Documentação MkDocs (`docs/`) e specs SDD (`docs/specs/`, `docs/contracts/`).
- [X] T012 Rodar `npm test` com cobertura e confirmar suíte verde.
- [X] T013 Deploy do app (Render) e dos docs (GitHub Pages).

## Dependencies

- Testes (3.2) antes da implementação (3.3).
- Model (T005) → Controller (T006) → Rotas (T007) → App (T009).
- Implementação antes de Polish.

## Parallel Example

```
# Independentes, podem ir juntas:
T003, T004  → escrever testes
T005        → implementar Model
```
