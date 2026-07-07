# 📝 TODO List

Bem-vindo à documentação da aplicação **TODO List** — um gerenciador de tarefas desenvolvido com a metodologia **SPEC-DRIVEN Development (SDD)** e arquitetura **MVC**.

## 🚀 Links Rápidos

| Recurso | Link |
|:---|:---|
| **Aplicação** | [todo-list-caiochiabai.onrender.com](https://todo-list-caiochiabai.onrender.com) |
| **Repositório** | [github.com/CaioChiabai/todo-list](https://github.com/CaioChiabai/todo-list) |

## ✨ Funcionalidades

- ✅ **Cadastrar tarefas** — Crie tarefas com título e descrição
- ❌ **Remover tarefas** — Remova tarefas com animação suave
- ✔️ **Marcar como concluída** — Toggle de status pendente/concluída
- 🌗 **Tema claro/escuro** — Interface adaptável
- 📱 **Responsivo** — Funciona em desktop e mobile

## 🛠️ Stack Tecnológica

| Componente | Tecnologia |
|:---|:---|
| Backend | Node.js + Express |
| Frontend | HTML + CSS + JavaScript (Vanilla) |
| Armazenamento | In-memory (Array JavaScript) |
| Testes | Jest + Supertest |
| Documentação | MKDocs + Material Theme |
| Hosting App | Render (Free Tier) |
| Hosting Docs | GitHub Pages |

## 📋 Metodologia

Este projeto foi desenvolvido seguindo as 4 fases do **SPEC-DRIVEN Development**:

1. **SPECIFY** — Especificações em `docs/specs/` (padrão GitHub Spec Kit)
2. **PLAN** — Arquitetura MVC documentada em `docs/specs/plan.md`
3. **TASKS** — Tarefas decompostas e rastreáveis em `docs/specs/tasks.md`
4. **IMPLEMENT** — Código implementado seguindo as specs

Leia mais em [Metodologia SDD](sdd.md).

## 🏃 Rodando Localmente

```bash
# Clonar o repositório
git clone https://github.com/CaioChiabai/todo-list.git
cd todo-list

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Rodar testes
npm test
```

Acesse `http://localhost:3000` no seu navegador.
