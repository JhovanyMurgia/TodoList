# TODO List

Esta documentacao apresenta a aplicacao **TODO List**, desenvolvida como projeto academico para demonstrar organizacao em camadas, API REST, testes automatizados e publicacao em ambiente web.

## Objetivo

Permitir que o usuario organize tarefas simples, cadastrando titulo e descricao, acompanhando o status de conclusao e removendo itens que nao forem mais necessarios.

## Funcionalidades

| Funcionalidade | Descricao |
|:---|:---|
| Cadastro de tarefas | Cria uma nova tarefa com titulo obrigatorio |
| Listagem | Mostra as tarefas em ordem de criacao |
| Atualizacao | Permite marcar uma tarefa como concluida |
| Exclusao | Remove uma tarefa pelo identificador |
| Tema visual | Alterna entre tema claro e escuro |

## Stack

- Node.js
- Express
- HTML, CSS e JavaScript
- Jest
- Supertest
- MkDocs Material

## Execucao local

```bash
npm install
npm run dev
```

A aplicacao fica disponivel em `http://localhost:3000`.
