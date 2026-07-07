# Research: TODO List

Registro das decisões técnicas (Phase 0). Formato: Decision / Rationale / Alternatives.

## R-01: Framework de backend

- **Decision**: Node.js + Express.
- **Rationale**: framework minimalista, ideal para uma API REST simples; ecossistema npm
  amplo; deploy trivial no Render; JavaScript full-stack (mesmo idioma do frontend).
- **Alternatives considered**:
  - *Fastify* — mais rápido, mas ganho irrelevante neste escopo e menos familiar.
  - *NestJS* — estrutura opinativa e DI, porém over-engineering para 4 endpoints.
  - *HTTP nativo* — evitaria dependência, mas reintroduziria boilerplate de roteamento.

## R-02: Estratégia de armazenamento

- **Decision**: array JavaScript em memória, encapsulado em `TaskModel`.
- **Rationale**: requisito do projeto (sem banco); operações em memória são rápidas;
  elimina configuração de DBMS. Trade-off (perda de dados no restart) é aceito.
- **Alternatives considered**:
  - *SQLite/arquivo JSON* — dariam persistência, mas violam o Princípio II.
  - *Redis* — persistência/So overhead desnecessário para usuário único.

## R-03: Frontend

- **Decision**: HTML + CSS + JavaScript vanilla, servido estaticamente pelo Express.
- **Rationale**: zero build; sem overhead de framework; demonstra domínio das bases da web;
  escopo pequeno não justifica SPA.
- **Alternatives considered**:
  - *React/Vue* — over-engineering para 2–3 telas; adiciona toolchain de build.

## R-04: Estratégia de testes

- **Decision**: Jest (unit no Model) + Supertest (integração nos endpoints).
- **Rationale**: Jest é padrão de mercado, zero-config e all-in-one; Supertest testa a
  API sem subir a porta. Cobre as duas camadas testáveis do MVC.
- **Alternatives considered**:
  - *Mocha + Chai + Sinon* — mais peças a configurar para o mesmo resultado.

## R-05: Identificador de tarefa

- **Decision**: UUID v4 (`uuid`).
- **Rationale**: ids únicos e não sequenciais, sem coordenação de estado; simples no cliente.
- **Alternatives considered**:
  - *Contador incremental* — colide após restart e vaza cardinalidade.
