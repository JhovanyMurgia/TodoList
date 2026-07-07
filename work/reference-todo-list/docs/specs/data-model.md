# Data Model: TODO List

## Entidade: Task

Representa um item da lista de afazeres. Vive no array em memória de `TaskModel`
(`src/models/taskModel.js`).

| Campo | Tipo | Regras | Origem |
|:---|:---|:---|:---|
| `id` | string (UUID v4) | Gerado pelo servidor; único; imutável. | `create()` |
| `title` | string | **Obrigatório**; `trim` aplicado; 1–100 caracteres. | entrada |
| `description` | string | Opcional; `trim` aplicado; 0–500 caracteres; default `''`. | entrada |
| `completed` | boolean | Default `false`; alternável via update. | servidor/entrada |
| `createdAt` | string (ISO-8601) | Definido na criação; imutável. | `create()` |
| `updatedAt` | string (ISO-8601) | Atualizado a cada modificação. | `create()`/`update()` |

## Regras de Validação

- **VR-01**: `title` ausente, não-string ou vazio após `trim` → erro
  *"O título é obrigatório."*
- **VR-02**: `title` com mais de 100 caracteres → erro
  *"O título deve ter no máximo 100 caracteres."*
- **VR-03**: `description` com mais de 500 caracteres → erro
  *"A descrição deve ter no máximo 500 caracteres."*
- **VR-04**: em `update`, `completed` é coagido para boolean (`Boolean(value)`).

*As regras VR-01..VR-04 são aplicadas exclusivamente no Model (Princípio I).*

## Ciclo de Vida

```
create() ──> [pendente] ──update(completed:true)──> [concluída]
                 ▲                                        │
                 └──────── update(completed:false) ───────┘
                                     │
                                  delete() ──> (removida)
```

## Ordenação

`findAll()` retorna as tarefas ordenadas por `createdAt` **decrescente**
(mais recentes primeiro).

## Persistência

Array em memória (`TaskModel.tasks`). **Sem** persistência entre reinícios do servidor —
decisão registrada no Princípio II da [Constituição](../memory/constitution.md) e em
[research.md](research.md) (R-02).
