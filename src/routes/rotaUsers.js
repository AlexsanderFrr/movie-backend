const express = require('express');
const router = express.Router();

//vamos carregar nosso modelo
const Users = require("../models/Users");

// Rota para criar um novo perfil
router.post('/add', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



//__ Fim das rotas de perfil ___
module.exports = router;