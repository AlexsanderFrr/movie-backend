# Movie Backend

![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)

Descrição do projeto. Este é um backend desenvolvido em Node.js para um aplicativo de gerenciamento de filmes.

## Como usar

Para utilizar este projeto, siga as etapas abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- Node.js (v14 ou superior)
- npm (Node Package Manager)

### Passo 1: Clone o repositório

Clone este repositório para o seu ambiente local:

```
bashCopy code
git clone https://github.com/AlexsanderFrr/movie-backend.git
```

### Passo 2: Instale as dependências

Navegue até o diretório raiz do projeto e instale as dependências executando o seguinte comando:

```
bashCopy codecd movie-backend
npm install
```

### Passo 3: Inicie o servidor

Para iniciar o servidor, utilize o seguinte comando:

```
bashCopy code
npm run dev
```

Isso iniciará o servidor backend na porta 8081.

### Passo 4: Acesse o servidor

Agora que o servidor está em execução, você pode acessar as APIs por meio da URL local: http://localhost:8081/.

## Estrutura do projeto

A estrutura do projeto é organizada da seguinte forma:

```
javaCopy code├── app.js

├── routes
│   ├── rotaUsers.js
│   ├── rotaMovies.js
│   ├── rotaGenres.js
│   ├── rotaMovies_genres.js
│   └── rotaUsers_rates.js
├── models
│   └── dbs.js
│   └── Genres.js
│   └── Movies_genres.js
│   └── Movies.js
│   └── Users_rates.js
│   └── .js
Users_rates
├── public
│   └── img
├── package.json
└── README.md
```

- `app.js`: Arquivo principal do aplicativo.
- `routes`: Pasta contendo os arquivos de rota para cada recurso.
- `models`: Pasta contendo os modelos do Sequelize para acesso ao banco de dados.
- `public/img`: Pasta para armazenar imagens estáticas.
- `package.json`: Arquivo de manifesto do projeto com as dependências e scripts.