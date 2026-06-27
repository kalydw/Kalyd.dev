# Kalyd Dev Portfolio

Portfólio pessoal de Pedro Kalyd, desenvolvido com HTML, CSS e JavaScript.

## Tecnologias usadas

- HTML
- CSS
- JavaScript

## Páginas do site

- `index.html`: página principal do portfólio.
- `portfolio.html`: vitrine com todos os projetos cadastrados, filtros e modal de resumo.
- `projeto.html?id=slug`: página dinâmica de detalhe de cada projeto, carregada pelo `id` do array.
- `evolucao.html`: página de evolução visual do projeto.
- `sobre.html`: página sobre mim.
- `obrigado.html`: confirmação de envio do formulário.

## Arquivos principais

- `projects.js`: lista central dos projetos exibidos no portfólio.
- `portfolio.js`: renderização dos cards, filtros e modal de resumo.
- `projeto.js`: renderização da página individual de cada projeto.
- `styles.css`: estilos principais do site, temas, cards, modal e páginas.

## Como adicionar projetos

Adicione um novo objeto no array do arquivo `projects.js`. O projeto aparecerá automaticamente na página `portfolio.html`, no modal de resumo e em `projeto.html?id=slug`.

Os projetos são adicionados via código, sem painel administrativo, login ou banco de dados.

## Imagens dos projetos

As imagens ficam em `assets/images/projects/nome-do-projeto/`.

Exemplo:

- `assets/images/projects/fmedchoices/desktop.png`
- `assets/images/projects/fmedchoices/mobile.png`

Depois, informe os caminhos nos campos `coverImage` e `gallery` do objeto do projeto em `projects.js`.

## Como executar localmente

Abra o arquivo `index.html` no navegador ou use um servidor local simples na pasta do projeto.

## Autor

Pedro Kalyd
