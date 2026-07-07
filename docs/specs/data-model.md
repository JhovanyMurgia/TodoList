# Modelo de Dados

## Task

| Campo | Tipo | Obrigatorio | Descricao |
|:---|:---|:---|:---|
| id | string | Sim | UUID da tarefa |
| title | string | Sim | Titulo da tarefa |
| description | string | Nao | Descricao complementar |
| completed | boolean | Sim | Indica se a tarefa foi concluida |
| createdAt | string | Sim | Data de criacao em ISO-8601 |
| updatedAt | string | Sim | Data da ultima atualizacao em ISO-8601 |

## Exemplo

```json
{
  "id": "1d4d2a8f-21ec-4f9f-8d76-6f8ec3f04c74",
  "title": "Estudar Express",
  "description": "Revisar rotas e middlewares",
  "completed": false,
  "createdAt": "2026-07-06T20:00:00.000Z",
  "updatedAt": "2026-07-06T20:00:00.000Z"
}
```
