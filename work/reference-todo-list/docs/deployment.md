# Deploy

Guia completo de deploy da aplicação e da documentação.

## Aplicação — Render

A aplicação está hospedada no **Render** (free tier).

**URL:** [https://todo-list-caiochiabai.onrender.com](https://todo-list-caiochiabai.onrender.com)

### Como foi configurado

1. Criar conta em [render.com](https://render.com)
2. Conectar conta do GitHub
3. Criar novo **Web Service**
4. Selecionar o repositório `CaioChiabai/todo-list`
5. Configurar:

| Campo | Valor |
|:---|:---|
| **Name** | todo-list-caiochiabai |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

6. Clicar em **Create Web Service**

### Observações

!!! warning "Cold Start"
    No free tier, o Render coloca o serviço em "sleep" após inatividade. A primeira requisição após o sleep pode demorar ~30-60 segundos para "acordar" o servidor.

!!! info "Dados não persistem"
    Como o armazenamento é em memória, os dados são **perdidos** quando o servidor reinicia ou entra em sleep. Isso é esperado conforme a especificação do projeto.

---

## Documentação — GitHub Pages

A documentação está hospedada no **GitHub Pages** via MKDocs.

**URL:** [https://caiochiabai.github.io/todo-list](https://caiochiabai.github.io/todo-list)

### Deploy Automático (GitHub Actions)

O deploy da documentação é automatizado via GitHub Actions. A cada push na branch `main`, o workflow:

1. Instala Python e MKDocs
2. Builda a documentação
3. Publica no branch `gh-pages`

**Arquivo:** `.github/workflows/deploy-docs.yml`

### Deploy Manual (Local)

Se necessário, o deploy pode ser feito localmente:

```bash
# Instalar MKDocs e tema Material
pip install mkdocs mkdocs-material

# Preview local
mkdocs serve

# Deploy para GitHub Pages
mkdocs gh-deploy
```

### Configuração do GitHub Pages

1. Ir em **Settings** > **Pages** no repositório
2. Em **Source**, selecionar **Deploy from a branch**
3. Em **Branch**, selecionar `gh-pages` / `/ (root)`
4. Clicar em **Save**

---

## Variáveis de Ambiente

A aplicação utiliza apenas uma variável de ambiente:

| Variável | Descrição | Default |
|:---|:---|:---|
| `PORT` | Porta do servidor HTTP | 3000 |

O Render define automaticamente a variável `PORT`.
