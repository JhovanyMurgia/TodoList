# Metodologia Spec-Driven Development (GitHub Spec Kit)

## O que é SDD?

**Spec-Driven Development (SDD)** é uma metodologia que trata a **especificação como
fonte de verdade**: o comportamento é descrito de forma precisa e estruturada **antes**
de o código ser escrito. Diferente do "vibe coding" (codificar por intuição), o SDD
estabelece contratos claros que guiam — e permanecem rastreáveis a — toda a implementação.

Este projeto adota o **[GitHub Spec Kit](https://github.com/github/spec-kit)**, o padrão
open-source da GitHub para SDD.

## Estrutura no repositório

```
.specify/
├── memory/constitution.md      # Fonte de verdade dos princípios
├── templates/                  # spec / plan / tasks / constitution / checklist
└── scripts/                    # Helpers (PowerShell + Bash)

.claude/commands/speckit.*.md   # Comandos do agente (Claude Code)

docs/
├── memory/constitution.md      # Constituição (publicada)
├── specs/                      # spec, plan, research, data-model, tasks, quickstart
└── contracts/api-v1.md         # Contrato da API
```

Os artefatos ficam em `docs/` para serem publicados no site MkDocs — por isso a
documentação é acessível diretamente a partir do link "Docs" da aplicação.

## As fases e comandos do Spec Kit

| Fase | Comando | Saída |
|:---|:---|:---|
| **Constituir** | `/speckit.constitution` | `.specify/memory/constitution.md` |
| **Especificar** | `/speckit.specify` | `docs/specs/spec.md` (o QUÊ e o PORQUÊ) |
| **Clarificar** | `/speckit.clarify` | resolve `[NEEDS CLARIFICATION]` |
| **Planejar** | `/speckit.plan` | `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` |
| **Tarefas** | `/speckit.tasks` | `docs/specs/tasks.md` |
| **Analisar** | `/speckit.analyze` | relatório de consistência (spec × plano × tarefas × constituição) |
| **Implementar** | `/speckit.implement` | código executando as tarefas |

## A Constituição como portão

Antes do planejamento, o **Constitution Check** verifica os 6 princípios do projeto
(MVC, armazenamento em memória, API RESTful, testes obrigatórios, frontend vanilla,
documentação viva). Qualquer violação precisa ser justificada em *Complexity Tracking*
ou eliminada. Leia em [Constituição](memory/constitution.md).

## SDD vs. outras metodologias

| Aspecto | SDD | TDD | Vibe Coding |
|:---|:---|:---|:---|
| **Ponto de partida** | Especificação formal | Teste unitário | Prompt informal |
| **Nível de abstração** | Alto (negócio + arquitetura) | Baixo (código) | Nenhum |
| **Rastreabilidade** | Total (spec → código) | Parcial (teste → código) | Nenhuma |
| **Documentação** | Obrigatória | Opcional | Inexistente |

## Benefícios neste projeto

1. **Clareza**: qualquer pessoa entende as decisões sem perguntar.
2. **Rastreabilidade**: cada requisito (`FR-xxx`) mapeia para tarefas e testes.
3. **Qualidade**: os testes derivam diretamente da spec e dos contratos.
4. **Documentação viva**: specs versionadas com o código e publicadas no site.
