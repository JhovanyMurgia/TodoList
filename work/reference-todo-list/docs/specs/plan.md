# Implementation Plan: TODO List

**Branch**: `001-todo-list` | **Date**: 2026-07-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification de `docs/specs/spec.md`

## Summary

Aplicação web de gerenciamento de tarefas (criar, listar, concluir, remover) exposta via
API REST e consumida por um frontend web. Arquitetura MVC, dados em memória, frontend
vanilla — conforme a [Constituição](../memory/constitution.md).

## Technical Context

**Language/Version**: Node.js 18+ / JavaScript (CommonJS)
**Primary Dependencies**: Express, uuid, cors
**Storage**: array em memória — sem banco de dados (Princípio II)
**Testing**: Jest + Supertest
**Target Platform**: servidor Node.js + navegador
**Project Type**: web (backend API + frontend estático servido pelo Express)
**Performance Goals**: respostas de API < 200 ms (SC-001)
**Constraints**: sem persistência entre reinicializações; sem frameworks frontend
**Scale/Scope**: usuário único, escopo acadêmico

## Constitution Check

*PORTÃO: passou antes da Phase 0 e reavaliado após a Phase 1.*

| Princípio | Conforme? | Observação |
|:---|:---|:---|
| I. Arquitetura MVC | ✅ | `models/`, `controllers/`, `routes/`, `views/` separados. |
| II. Armazenamento em memória | ✅ | `TaskModel` usa array; sem banco de dados. |
| III. API RESTful | ✅ | `GET/POST/PUT/DELETE /api/tasks` com status codes corretos. |
| IV. Testes obrigatórios | ✅ | Jest (unit no Model) + Supertest (integração nos endpoints). |
| V. Frontend Vanilla | ✅ | HTML/CSS/JS puro em `src/views/`; sem build. |
| VI. Documentação viva | ✅ | Specs em `docs/specs/`, publicadas via MkDocs. |

**Violações**: nenhuma.

## Project Structure

### Documentation (esta feature)

```
docs/
├── specs/
│   ├── spec.md          # /speckit.specify
│   ├── plan.md          # /speckit.plan (este arquivo)
│   ├── research.md       # Phase 0
│   ├── data-model.md     # Phase 1
│   ├── tasks.md          # /speckit.tasks
│   └── quickstart.md     # Phase 1
├── contracts/
│   └── api-v1.md         # Phase 1
└── memory/
    └── constitution.md   # cópia publicável
```

### Source Code (repositório)

```
src/
├── app.js                # Entry point Express
├── models/taskModel.js   # MODEL — array em memória
├── controllers/taskController.js  # CONTROLLER — orquestra HTTP
├── routes/taskRoutes.js  # ROUTES — mapeia endpoints
└── views/                # VIEW — HTML/CSS/JS
tests/
└── task.test.js          # Jest + Supertest
```

## Phase 0: Outline & Research

Incógnitas resolvidas em [research.md](research.md): escolha de Express, estratégia de
armazenamento em memória, frontend sem framework, estratégia de testes.

## Phase 1: Design & Contracts

- Entidades → [data-model.md](data-model.md).
- Contrato de API → [../contracts/api-v1.md](../contracts/api-v1.md).
- Validação ponta a ponta → [quickstart.md](quickstart.md).

## Phase 2: Task Planning Approach

Ver [tasks.md](tasks.md): tarefas derivadas dos contratos e entidades, com testes antes
da implementação (Princípio IV) e marcação `[P]` para paralelismo.

## Complexity Tracking

Nenhuma violação a justificar.

## Progress Tracking

- [x] Phase 0: Research completa
- [x] Phase 1: Design completo
- [x] Phase 2: Abordagem de tarefas descrita
- [x] Constitution Check inicial: PASS
- [x] Constitution Check pós-design: PASS
