# Arquitetura

## Padrão MVC

A aplicação segue o padrão **Model-View-Controller (MVC)**, separando a aplicação em três camadas com responsabilidades bem definidas.

## Diagrama da Arquitetura

```
┌─────────────────────────────────────────────────┐
│                    CLIENT                        │
│              (Browser / Frontend)                │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │              VIEW (index.html)           │   │
│   │  ┌────────┐ ┌────────┐ ┌─────────────┐  │   │
│   │  │ style  │ │ app.js │ │ Fetch API   │  │   │
│   │  │  .css  │ │        │ │ (HTTP)      │  │   │
│   │  └────────┘ └────────┘ └──────┬──────┘  │   │
│   └───────────────────────────────┼──────────┘   │
└───────────────────────────────────┼──────────────┘
                                    │ HTTP Request
                                    ▼
┌─────────────────────────────────────────────────┐
│                    SERVER                        │
│               (Node.js + Express)                │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │            ROUTES (taskRoutes.js)        │   │
│   │  GET /api/tasks    POST /api/tasks       │   │
│   │  PUT /api/tasks/:id  DELETE /api/tasks/:id│  │
│   └──────────────────┬───────────────────────┘   │
│                      │                           │
│   ┌──────────────────▼───────────────────────┐   │
│   │       CONTROLLER (taskController.js)     │   │
│   │  createTask()  getAllTasks()              │   │
│   │  updateTask()  deleteTask()              │   │
│   └──────────────────┬───────────────────────┘   │
│                      │                           │
│   ┌──────────────────▼───────────────────────┐   │
│   │          MODEL (taskModel.js)            │   │
│   │  In-Memory Array: tasks[]                │   │
│   │  create() findAll() findById()           │   │
│   │  update() delete()                       │   │
│   └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Camadas

### Model (`src/models/taskModel.js`)

Responsável pelo gerenciamento dos dados. Utiliza um **array JavaScript em memória** como store.

**Métodos:**

| Método | Descrição |
|:---|:---|
| `create(data)` | Cria uma nova tarefa com validação |
| `findAll()` | Retorna todas as tarefas (mais recentes primeiro) |
| `findById(id)` | Busca uma tarefa pelo ID |
| `update(id, data)` | Atualiza campos de uma tarefa existente |
| `delete(id)` | Remove uma tarefa pelo ID |

### Controller (`src/controllers/taskController.js`)

Recebe as requisições HTTP, delega ao Model e retorna respostas JSON com status codes apropriados.

**Funções:**

| Função | Endpoint | Descrição |
|:---|:---|:---|
| `getAllTasks` | GET /api/tasks | Lista todas as tarefas |
| `createTask` | POST /api/tasks | Cria nova tarefa |
| `updateTask` | PUT /api/tasks/:id | Atualiza tarefa |
| `deleteTask` | DELETE /api/tasks/:id | Remove tarefa |

### Routes (`src/routes/taskRoutes.js`)

Mapeia URLs HTTP para funções do Controller usando Express Router.

### View (`src/views/`)

Interface web servida como arquivos estáticos pelo Express.

**Arquivos:**

- `index.html` — Estrutura da página (formulário, lista, filtros)
- `css/style.css` — Design system com variáveis CSS, temas, animações
- `js/app.js` — Lógica frontend (fetch API, rendering, eventos)

## Estrutura de Diretórios

```
src/
├── app.js                    # Entry point - configura Express
├── models/
│   └── taskModel.js          # MODEL - dados em memória
├── controllers/
│   └── taskController.js     # CONTROLLER - lógica de negócio
├── routes/
│   └── taskRoutes.js         # ROUTES - definição de endpoints
└── views/
    ├── index.html            # VIEW - página principal
    ├── css/
    │   └── style.css         # VIEW - estilos
    └── js/
        └── app.js            # VIEW - lógica frontend
```

## Modelo de Dados

Cada tarefa possui a seguinte estrutura:

```json
{
  "id": "uuid-v4",
  "title": "string (obrigatório, max 100)",
  "description": "string (opcional, max 500)",
  "completed": false,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Fluxo de Dados

### Criar Tarefa

```
Browser → POST /api/tasks (body: { title, description })
       → Router → Controller.createTask()
       → Model.create() → tasks.push(newTask)
       → 201 Created + JSON da tarefa
       → Browser adiciona card na lista
```

### Remover Tarefa

```
Browser → DELETE /api/tasks/:id
       → Router → Controller.deleteTask()
       → Model.delete() → tasks.splice(index, 1)
       → 200 OK + mensagem
       → Browser remove card com animação
```
