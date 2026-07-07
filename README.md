# TODO List

Aplicacao web de gerenciamento de tarefas desenvolvida para disciplina da faculdade, usando arquitetura MVC, API REST, frontend vanilla, testes automatizados e documentacao com MkDocs.

## Links

- Aplicacao: `https://seu-projeto.onrender.com`
- Documentacao: `https://seu-usuario.github.io/todo-list`
- Repositorio: `https://github.com/seu-usuario/todo-list`

## Funcionalidades

- Cadastrar tarefas com titulo e descricao.
- Listar tarefas cadastradas.
- Marcar tarefas como concluidas.
- Remover tarefas.
- Alternar entre tema claro e escuro.
- Consultar status da API por health check.

## Arquitetura

O projeto segue o padrao MVC:

```txt
src/
  models/       Regras e armazenamento em memoria
  controllers/  Tratamento das requisicoes HTTP
  routes/       Endpoints REST
  views/        Interface HTML, CSS e JavaScript
```

## Tecnologias

| Componente | Tecnologia |
|:---|:---|
| Backend | Node.js + Express |
| Frontend | HTML + CSS + JavaScript |
| Armazenamento | Array em memoria |
| Testes | Jest + Supertest |
| Documentacao | MkDocs + Material |
| Deploy da app | Render |
| Deploy dos docs | GitHub Pages |

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Testes

```bash
npm test
```

## Endpoints

| Metodo | Endpoint | Descricao |
|:---|:---|:---|
| GET | `/api/tasks` | Lista tarefas |
| POST | `/api/tasks` | Cria tarefa |
| PUT | `/api/tasks/:id` | Atualiza tarefa |
| DELETE | `/api/tasks/:id` | Remove tarefa |
| GET | `/api/health` | Status da aplicacao |

## Documentacao MkDocs

Para rodar a documentacao localmente:

```bash
pip install mkdocs-material
mkdocs serve
```

O projeto tambem inclui o workflow `.github/workflows/pages.yml`, que publica a documentacao automaticamente no GitHub Pages quando houver push na branch `main`.

Para publicar manualmente, caso prefira:

```bash
mkdocs gh-deploy
```
