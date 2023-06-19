const express = require('express');
const cors = require('cors');

//Criar o app
const app = express();

// app.use((req, res, next) => {
//     header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//     header("Access-Control-Allow-Methods", "POST, GET, PUT");
//     app.use(cors());
//     next();
// });
app.use(cors({
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
}));

const rotaUsers = require('./routes/rotaUsers');
const rotaMovies = require('./routes/rotaMovies');
const rotaGenres = require('./routes/rotaGenres');
const rotaMovies_genres = require('./routes/rotaMovies_genres');
const rotaUsers_rates = require('./routes/rotaUsers_rates');

app.use('/images', express.static('public/img'));

app.use(express.json());

//Remanejando Rotas de Users
app.use('/rota-users', rotaUsers);
app.use('/rota-movies', rotaMovies);
app.use('/rota-genres', rotaGenres);
app.use('/rota-movies-genres', rotaMovies_genres);
app.use('/rota-users-rates', rotaUsers_rates);


// Rotas e controladores do Sequelize virão aqui

app.listen(8081, () => {
    console.log('Servidor iniciado na porta 8081');
});