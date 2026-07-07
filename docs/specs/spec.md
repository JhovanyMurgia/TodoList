# Especificacao

## Requisitos Funcionais

| Codigo | Requisito |
|:---|:---|
| RF01 | O usuario deve cadastrar uma tarefa com titulo |
| RF02 | O usuario deve informar uma descricao opcional |
| RF03 | O usuario deve visualizar todas as tarefas |
| RF04 | O usuario deve marcar uma tarefa como concluida |
| RF05 | O usuario deve remover uma tarefa |
| RF06 | A aplicacao deve oferecer tema claro e escuro |

## Regras de Validacao

| Codigo | Regra |
|:---|:---|
| RV01 | O titulo e obrigatorio |
| RV02 | O titulo deve ter no maximo 100 caracteres |
| RV03 | A descricao deve ter no maximo 500 caracteres |
| RV04 | Toda tarefa deve iniciar como pendente |

## Requisitos Nao Funcionais

- A aplicacao deve usar arquitetura MVC.
- A API deve seguir convencoes REST.
- O frontend deve funcionar sem etapa de build.
- O projeto deve possuir testes automatizados.
- A documentacao deve ser publicada com MkDocs.
