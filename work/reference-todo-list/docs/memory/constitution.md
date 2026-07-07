<!--
SYNC IMPACT REPORT
==================
Version change: (inicial) → 1.0.0
Ratification: adoção do padrão GitHub Spec Kit no projeto TODO List.

Princípios definidos:
  I.   Arquitetura MVC (NÃO-NEGOCIÁVEL)
  II.  Armazenamento em Memória (Sem Banco de Dados)
  III. API RESTful
  IV.  Testes Obrigatórios
  V.   Frontend Vanilla (Sem Frameworks)
  VI.  Documentação Viva

Seções adicionais:
  - Restrições Tecnológicas
  - Fluxo de Desenvolvimento (SDD)

Templates verificados:
  ✅ .specify/templates/spec-template.md — alinhado (sem detalhes de implementação)
  ✅ .specify/templates/plan-template.md — alinhado (Constitution Check inclui os 6 princípios)
  ✅ .specify/templates/tasks-template.md — alinhado (TDD antes da implementação)

TODOs pendentes: nenhum.
-->

# Constituição do Projeto — TODO List

## Princípios Fundamentais

### I. Arquitetura MVC (NÃO-NEGOCIÁVEL)

Todo código deve respeitar a separação Model-View-Controller:

- **Model** (`src/models/`) encapsula dados e regras de negócio. É a **única**
  camada autorizada a criar, validar e mutar tarefas.
- **Controller** (`src/controllers/`) traduz HTTP em chamadas ao Model e devolve
  status codes e JSON. **Nunca** contém regra de negócio nem acessa o array de dados
  diretamente.
- **View** (`src/views/`) cuida exclusivamente da apresentação. **Nunca** contém
  regra de negócio; comunica-se com o servidor apenas via HTTP (Fetch API).

**Justificativa**: separação de responsabilidades torna cada camada testável em
isolamento e deixa óbvio, para qualquer desenvolvedor, onde cada tipo de lógica vive.

### II. Armazenamento em Memória (Sem Banco de Dados)

Os dados vivem em um array JavaScript em memória. É **proibido** introduzir banco de
dados persistente (SQLite, PostgreSQL, MongoDB, etc.) ou qualquer I/O de disco para
estado da aplicação.

**Justificativa**: requisito explícito do projeto. A perda de dados ao reiniciar o
servidor é um trade-off aceito em troca de simplicidade e velocidade. Qualquer plano
que exija persistência deve primeiro emendar esta constituição.

### III. API RESTful

Os endpoints seguem convenções REST: verbos HTTP corretos (`GET`, `POST`, `PUT`,
`DELETE`), status codes adequados (`200`, `201`, `400`, `404`, `500`) e respostas em
JSON. Contratos de API são documentados antes da implementação (`contracts/`).

### IV. Testes Obrigatórios

Toda funcionalidade tem cobertura automatizada com Jest:

- **Testes unitários** no Model (regras de validação, CRUD).
- **Testes de integração** nos endpoints via Supertest.
- Tarefas de teste vêm **antes** das tarefas de implementação no `tasks.md` (TDD).

Nenhuma feature é considerada concluída com testes vermelhos.

### V. Frontend Vanilla (Sem Frameworks)

A View usa HTML, CSS e JavaScript puros. É **proibido** introduzir frameworks SPA
(React, Vue, Angular, Svelte) ou etapas de build (Webpack, Babel, bundlers). O HTML é
servido diretamente pelo Express.

**Justificativa**: para o escopo do projeto, um framework SPA é over-engineering;
zero dependências de build mantém o deploy trivial.

### VI. Documentação Viva

Toda mudança de comportamento é refletida nas specs (`specs/`) e na documentação
(`docs/` — MKDocs). Specs e código evoluem juntos no mesmo repositório (mono-repo);
uma spec desatualizada é tratada como bug.

## Restrições Tecnológicas

- **Backend**: Node.js + Express.
- **Frontend**: HTML + CSS + JavaScript (Vanilla).
- **Testes**: Jest + Supertest.
- **Documentação**: MKDocs + Material Theme, publicada no GitHub Pages.
- **Deploy**: Render (free tier), deploy automático a cada push na `main`.
- **Proibições**: banco de dados persistente; frameworks frontend; credenciais/secrets
  hardcoded; commit de `node_modules/` ou `site/`.
- **Convenções**: código em inglês; documentação em português; `camelCase` para
  variáveis/funções, `PascalCase` para classes; indentação de 2 espaços; aspas simples
  em JavaScript.

## Fluxo de Desenvolvimento (SDD)

Este projeto adota o **Spec-Driven Development** do GitHub Spec Kit. Toda feature
percorre as fases, nesta ordem:

1. `/specify` — descreve o **quê** e o **porquê** em `spec.md` (sem detalhes técnicos).
2. `/clarify` — resolve ambiguidades marcadas como `[NEEDS CLARIFICATION]`.
3. `/plan` — define o **como** em `plan.md`, `data-model.md`, `contracts/`, `quickstart.md`.
4. `/tasks` — quebra o plano em `tasks.md`, testes antes da implementação.
5. `/analyze` — checa consistência entre spec, plano, tarefas e esta constituição.
6. `/implement` — executa as tarefas.

O **Constitution Check** do `plan.md` é um portão obrigatório: qualquer violação dos
princípios acima deve ser justificada na seção *Complexity Tracking* ou eliminada antes
de prosseguir.

## Governança

- Esta constituição **prevalece** sobre qualquer outra prática do projeto.
- **Emendas** exigem: documentação da mudança, atualização da versão e propagação para
  os templates dependentes.
- **Versionamento semântico** da constituição:
  - **MAJOR**: remoção/redefinição incompatível de princípios.
  - **MINOR**: novo princípio ou seção materialmente expandida.
  - **PATCH**: esclarecimentos e correções sem mudança de significado.
- Todo PR/revisão deve verificar conformidade com estes princípios.

**Versão**: 1.0.0 | **Ratificada em**: 2026-07-06 | **Última emenda**: 2026-07-06
