# Feature Specification: TODO List

**Feature Branch**: `001-todo-list`
**Created**: 2026-07-06
**Status**: Implemented
**Input**: User description: "Uma aplicação web de gerenciamento de tarefas onde o usuário
possa cadastrar tarefas com título e descrição, marcar como concluídas e removê-las,
com interface responsiva e tema claro/escuro, sem necessidade de login."

## ⚡ Guardrails

- Foco no **QUÊ** o usuário precisa e no **PORQUÊ**.
- Sem detalhes de implementação nesta spec (ver `plan.md` para o **COMO**).

## User Scenarios & Testing *(obrigatório)*

### User Story 1 - Cadastrar Tarefas (Priority: P1)

Como usuário, quero criar tarefas com um título (e opcionalmente uma descrição) para
registrar o que preciso fazer.

**Why this priority**: é a razão de existir de uma TODO List; sem criação, nada mais funciona.

**Independent Test**: informar um título, submeter, e ver a tarefa aparecer na lista.

**Acceptance Scenarios**:

1. **Given** o campo de título preenchido, **When** submeto o formulário, **Then** a
   tarefa aparece no topo da lista.
2. **Given** o título vazio, **When** tento submeter, **Then** recebo uma mensagem de
   erro e a tarefa não é criada.
3. **Given** um título com mais de 100 caracteres, **When** submeto, **Then** a criação
   é rejeitada com mensagem de erro.

### User Story 2 - Marcar como Concluída / Reabrir (Priority: P1)

Como usuário, quero marcar uma tarefa como concluída (e reverter) para acompanhar meu progresso.

**Why this priority**: acompanhar o estado das tarefas é essencial ao uso diário.

**Independent Test**: alternar o estado de uma tarefa e ver a mudança visual persistir.

**Acceptance Scenarios**:

1. **Given** uma tarefa pendente, **When** marco como concluída, **Then** ela é exibida
   como concluída.
2. **Given** uma tarefa concluída, **When** desmarco, **Then** ela volta a pendente.

### User Story 3 - Remover Tarefas (Priority: P1)

Como usuário, quero remover tarefas que não preciso mais para manter a lista limpa.

**Why this priority**: sem remoção, a lista cresce indefinidamente e perde utilidade.

**Independent Test**: remover uma tarefa e confirmar que ela some da lista.

**Acceptance Scenarios**:

1. **Given** uma tarefa na lista, **When** clico em remover, **Then** ela desaparece da lista.
2. **Given** uma tarefa que não existe mais, **When** tento removê-la, **Then** o sistema
   responde que ela não foi encontrada.

### User Story 4 - Visualização e Tema (Priority: P2)

Como usuário, quero uma interface responsiva com tema claro/escuro para usar
confortavelmente em qualquer dispositivo.

**Why this priority**: melhora a usabilidade, mas não é essencial ao gerenciamento.

**Acceptance Scenarios**:

1. **Given** a aplicação aberta, **When** alterno o tema, **Then** a interface muda entre
   claro e escuro.
2. **Given** a aplicação em uma tela estreita, **When** visualizo a lista, **Then** o
   layout se adapta sem quebrar.

### Edge Cases

- Título composto só de espaços em branco → tratado como vazio (rejeitado).
- Título/descrição com espaços nas bordas → normalizados (trim).
- Descrição acima de 500 caracteres → rejeitada.
- Remover ou atualizar uma tarefa inexistente → "não encontrada" (sem quebrar a UI).
- Reinício do servidor → tarefas são perdidas (armazenamento em memória, por decisão).

## Requirements *(obrigatório)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir criar tarefas com título obrigatório e descrição opcional.
- **FR-002**: O sistema DEVE rejeitar tarefas com título vazio ou só com espaços.
- **FR-003**: O sistema DEVE limitar o título a 100 caracteres e a descrição a 500 caracteres.
- **FR-004**: O sistema DEVE atribuir a cada tarefa um identificador único e registrar
  data de criação e de atualização.
- **FR-005**: Toda tarefa DEVE iniciar com estado "pendente" (não concluída).
- **FR-006**: O sistema DEVE permitir marcar/desmarcar uma tarefa como concluída.
- **FR-007**: O sistema DEVE permitir remover uma tarefa existente.
- **FR-008**: O sistema DEVE listar as tarefas, das mais recentes para as mais antigas.
- **FR-009**: O sistema DEVE responder "não encontrada" ao atualizar/remover um id inexistente.
- **FR-010**: A interface DEVE ser responsiva e oferecer tema claro/escuro.

### Key Entities

- **Task (Tarefa)**: item da lista de afazeres.
  - Atributos: identificador único, título, descrição, estado de conclusão, data de
    criação, data de atualização.

## Success Criteria *(obrigatório)*

### Measurable Outcomes

- **SC-001**: Criar, concluir e remover uma tarefa respondem em menos de 200 ms.
- **SC-002**: 100% das validações (título vazio, limites de tamanho) são aplicadas antes
  de persistir a tarefa.
- **SC-003**: A suíte de testes automatizados cobre criação, listagem, atualização e
  remoção, e passa 100% verde.
- **SC-004**: A interface permanece utilizável de 320 px (mobile) a desktop.

## Assumptions

- Aplicação de usuário único, sem autenticação (fora de escopo).
- Persistência apenas em memória; perda de dados ao reiniciar é aceitável neste escopo.
- Sem notificações, lembretes ou múltiplos usuários (fora de escopo).
