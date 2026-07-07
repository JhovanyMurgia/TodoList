# Quickstart: TODO List

Como rodar e validar a feature ponta a ponta.

## Pré-requisitos

- Node.js 18+ e npm.

## Rodar localmente

```bash
npm install       # instalar dependências
npm run dev       # servidor com --watch (ou: npm start)
```

Acesse `http://localhost:3000`.

## Validação manual (mapeada às User Stories)

1. **US1 — Cadastrar**: preencha um título e submeta → a tarefa aparece no topo da lista.
2. **US1 — Validação**: submeta sem título → mensagem de erro; nada é criado.
3. **US2 — Concluir/Reabrir**: marque uma tarefa como concluída e desmarque → o estado alterna.
4. **US3 — Remover**: remova uma tarefa → ela some da lista.
5. **US4 — Tema**: alterne claro/escuro e reduza a janela → o layout se adapta.

## Validação por API (curl)

```bash
# Criar
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar SDD","description":"Ler o spec-kit"}'

# Listar
curl http://localhost:3000/api/tasks

# Concluir (troque :id pelo id retornado)
curl -X PUT http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" -d '{"completed":true}'

# Remover
curl -X DELETE http://localhost:3000/api/tasks/:id

# Health check
curl http://localhost:3000/api/health
```

## Testes automatizados

```bash
npm test          # Jest + Supertest, com cobertura
```

Critério de aceite: suíte 100% verde (SC-003).
