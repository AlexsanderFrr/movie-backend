const express = require('express');
const app = express();

const rotaUsers = require('./routes/rotaUsers');

app.use('/images', express.static('public/img'));

app.use(express.json());

//Remanejando Rotas de Users
app.use('/rota-users', rotaUsers);

// Rotas e controladores do Sequelize virão aqui

app.listen(8081, () => {
    console.log('Servidor iniciado na porta 8081');
});