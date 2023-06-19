const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//pegamos a entidade em si dessa forma usando .Genres
const Users = require('../models').Users;

//Cadastra Usuario (POST)
router.post('/add', async (req, res) => {
    try {
        const { nick, email, pwd } = req.body;
        const newEdit = await Users.create({ nick, email, pwd })
        res.status(200).json({ message: 'Usuario Cadastrado com sucesso', user: newEdit });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar todos os Usuarios
router.get('/all', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Busca Por id do Usuario (GET)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params;
        const users = await Users.findByPk(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Alterar Usuario por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { nick, email, pwd } = req.body;
        await Users.update(
            { nick, email, pwd },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json({ message: 'Usuario Atualizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Deletar Filme por id (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Usuario Excluído com sucesso' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;