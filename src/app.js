const express = require('express');

//Criar o app
const app = express();

const rotaUsers = require('./routes/rotaUsers');
const rotaPosts = require('./routes/rotaPosts');

app.use('/images', express.static('public/img'));

app.use(express.json());

//Remanejando Rotas de Users
app.use('/rota-users', rotaUsers);
app.use('/rota-posts', rotaPosts);

// Rotas e controladores do Sequelize virão aqui

app.listen(8081, () => {
    console.log('Servidor iniciado na porta 8081');
});