# Arquitetura

A aplicacao utiliza o padrao **MVC**, separando responsabilidades entre dados, regras de entrada/saida e apresentacao.

## Camadas

| Camada | Diretorio | Responsabilidade |
|:---|:---|:---|
| Model | `src/models` | Armazenar e validar tarefas |
| Controller | `src/controllers` | Processar requisicoes HTTP |
| Routes | `src/routes` | Mapear endpoints da API |
| View | `src/views` | Exibir a interface web |

## Fluxo

```txt
Usuario -> View -> API REST -> Routes -> Controller -> Model
```

## Armazenamento

As tarefas ficam em um array em memoria. Isso significa que os dados sao perdidos quando o servidor reinicia, mas a solucao atende ao escopo academico sem depender de banco de dados.
