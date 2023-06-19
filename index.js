const express = require('express');
const bodyParser = require('body-parser');
//protocolo de comunicacão entre apis e outros serviços cors
//CORS: autoriza para qualquer tipo de serviço (front-end, outras apis,etc)

const cors = require('cors')
const app = express();
const port = 8081;

//importações
const genres = require('./controllers/genreController.js');
const movies = require('./controllers/movieController.js');

//Rotas
app.use(bodyParser.json());
//Função CORS para a autorização do uso da API
app.use(cors())

app.get('/', (req, res) => res.send('HELLO WORLD, ROTA OK'))

app.use('/rota-genres', genres);
app.use('/rota-movies', movies);

app.listen(port, () => console.log(`Servidor rodando porta ${port}!`))