# API Contract — v1

Base URL: `/api`
Formato: JSON (`Content-Type: application/json`).

## Modelo: Task

```json
{
  "id": "string (UUID v4)",
  "title": "string (1–100 chars)",
  "description": "string (0–500 chars)",
  "completed": false,
  "createdAt": "string (ISO-8601)",
  "updatedAt": "string (ISO-8601)"
}
```

## Endpoints

### GET /api/tasks

Lista todas as tarefas (mais recentes primeiro).

- **200 OK** → `Task[]`

### POST /api/tasks

Cria uma tarefa.

- **Request body**: `{ "title": "string", "description": "string (opcional)" }`
- **201 Created** → `Task`
- **400 Bad Request** → `{ "error": "mensagem" }` (título ausente/vazio, ou limites de
  tamanho excedidos)

### PUT /api/tasks/:id

Atualiza uma tarefa (título, descrição e/ou `completed`).

- **Request body**: `{ "title"?: string, "description"?: string, "completed"?: boolean }`
- **200 OK** → `Task`
- **400 Bad Request** → `{ "error": "mensagem" }` (validação)
- **404 Not Found** → `{ "error": "Tarefa não encontrada." }`

### DELETE /api/tasks/:id

Remove uma tarefa.

- **200 OK** → `{ "message": "Tarefa removida com sucesso." }`
- **404 Not Found** → `{ "error": "Tarefa não encontrada." }`

### GET /api/health

Verificação de saúde do serviço.

- **200 OK** → `{ "status": "ok", "timestamp": "ISO-8601", "uptime": number }`

## Tabela-resumo

| Método | Endpoint | Corpo | Sucesso | Erros |
|:---|:---|:---|:---|:---|
| GET | `/api/tasks` | — | 200 `Task[]` | 500 |
| POST | `/api/tasks` | `{ title, description? }` | 201 `Task` | 400, 500 |
| PUT | `/api/tasks/:id` | `{ title?, description?, completed? }` | 200 `Task` | 400, 404 |
| DELETE | `/api/tasks/:id` | — | 200 `{ message }` | 404, 500 |
| GET | `/api/health` | — | 200 `{ status, ... }` | — |

## Códigos de Erro

| Status | Significado |
|:---|:---|
| 400 | Dados inválidos (título ausente/vazio, limites de tamanho). |
| 404 | Tarefa não encontrada. |
| 500 | Erro interno do servidor. |
