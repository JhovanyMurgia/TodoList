# Deploy

## Render

1. Criar um novo Web Service.
2. Conectar o repositorio GitHub.
3. Selecionar o plano gratuito.
4. Usar os comandos:

```txt
Build Command: npm install
Start Command: npm start
```

5. Testar a URL gerada pelo Render.

O arquivo `render.yaml` tambem permite criar o servico como Blueprint no Render.

## GitHub Pages com MkDocs

Instalar o tema:

```bash
pip install mkdocs-material
```

Publicar:

```bash
mkdocs gh-deploy
```

Depois, acessar:

```txt
https://seu-usuario.github.io/todo-list
```

Este repositorio tambem possui um workflow em `.github/workflows/pages.yml` para publicar a documentacao automaticamente pelo GitHub Actions.
