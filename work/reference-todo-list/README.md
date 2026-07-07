# 📝 TODO List — SPEC-DRIVEN Development

Uma aplicação web de gerenciamento de tarefas construída com a metodologia **SPEC-DRIVEN Development (SDD)**, arquitetura **MVC**, e armazenamento em memória.

## 🚀 Demo

- **Aplicação**: [todo-list on Render](https://todo-list-caiochiabai.onrender.com)
- **Documentação**: [MKDocs on GitHub Pages](https://caiochiabai.github.io/todo-list)

## ✨ Funcionalidades

- ✅ Cadastrar tarefas com título e descrição
- ❌ Remover tarefas
- ✔️ Marcar tarefas como concluídas
- 🌗 Tema claro/escuro
- 📱 Interface responsiva

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)**:

```
src/
├── models/         → Dados em memória (Array)
├── views/          → Interface HTML/CSS/JS
├── controllers/    → Lógica de negócio
└── routes/         → Endpoints REST API
```

## 📋 Spec-Driven Development (GitHub Spec Kit)

Este projeto segue o **[GitHub Spec Kit](https://github.com/github/spec-kit)**, o padrão
open-source da GitHub para SDD.

```
.specify/
├── memory/constitution.md   # Fonte de verdade dos princípios
├── templates/               # spec / plan / tasks / constitution / checklist
└── scripts/                 # Helpers (PowerShell + Bash)
.claude/commands/speckit.*   # Comandos do agente
docs/
├── memory/constitution.md   # Constituição publicada
├── specs/                   # spec, plan, research, data-model, tasks, quickstart
└── contracts/api-v1.md      # Contrato da API
```

### Princípios da Constituição (v1.0.0)

Definidos em [`.specify/memory/constitution.md`](.specify/memory/constitution.md):

1. **Arquitetura MVC** (não-negociável) — Model/Controller/View separados.
2. **Armazenamento em memória** — sem banco de dados persistente.
3. **API RESTful** — verbos e status codes corretos, contratos documentados.
4. **Testes obrigatórios** — Jest + Supertest, TDD (testes antes da implementação).
5. **Frontend Vanilla** — sem frameworks/build.
6. **Documentação viva** — specs e código evoluem juntos e são publicados no MkDocs.

### Fluxo de comandos

`/speckit.constitution` → `/speckit.specify` → `/speckit.clarify` → `/speckit.plan`
→ `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement`

## 🛠️ Tecnologias

| Componente | Tecnologia |
|:---|:---|
| Backend | Node.js + Express |
| Frontend | HTML + CSS + JavaScript (Vanilla) |
| Armazenamento | In-memory (Array) |
| Testes | Jest + Supertest |
| Documentação | MKDocs + Material Theme |
| Hosting | Render (app) + GitHub Pages (docs) |

## 🏃 Rodando Localmente

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Rodar testes
npm test
```

Acesse `http://localhost:3000`

## 📖 Documentação

A documentação completa está disponível em: [https://caiochiabai.github.io/todo-list](https://caiochiabai.github.io/todo-list)

## 📄 Licença

MIT
