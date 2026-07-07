# Contrato da API v1

Base URL: `/api`

Formato: JSON.

## Modelo Task

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

## GET /tasks

Lista todas as tarefas.

**Resposta 200**

```json
[
  {
    "id": "uuid",
    "title": "Estudar",
    "description": "Revisar conteudo",
    "completed": false,
    "createdAt": "2026-07-06T20:00:00.000Z",
    "updatedAt": "2026-07-06T20:00:00.000Z"
  }
]
```

## POST /tasks

Cria uma tarefa.

**Body**

```json
{
  "title": "Estudar Node.js",
  "description": "Revisar Express"
}
```

**Resposta 201**: tarefa criada.

**Resposta 400**: dados invalidos.

## PUT /tasks/:id

Atualiza uma tarefa.

**Body**

```json
{
  "title": "Estudar API REST",
  "description": "Atualizar anotacoes",
  "completed": true
}
```

**Resposta 200**: tarefa atualizada.

**Resposta 404**: tarefa nao encontrada.

## DELETE /tasks/:id

Remove uma tarefa.

**Resposta 200**

```json
{
  "message": "Tarefa removida com sucesso."
}
```

## GET /health

Verifica se a aplicacao esta ativa.

**Resposta 200**

```json
{
  "status": "ok",
  "timestamp": "2026-07-06T20:00:00.000Z",
  "uptime": 10.5
}
```
