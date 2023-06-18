const express = require('express');
const router = express.Router();

//vamos carregar nosso modelo
const Users = require("../models/Users");

//Rota para autentication

// Rota para criar um novo perfil
router.post('/add', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter todos os usuarios
router.get('/all', async (req, res) => {
    try {
        const user = await Users.findAll();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um usuario específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findOne({ where: { id_user: id } });
        if (user) {
            res.json(user);
        } else {
            throw new Error('Usuario não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um Usuario existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Users.update(req.body, {
            where: { id_user: id }
        });
        if (updated) {
            const user = await Users.findOne({ where: { id_user: id } });
            res.json(user);
        } else {
            throw new Error('Usuario não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para excluir um Usuario específico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Users.destroy({
            where: { id_user: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Usuario não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//__ Fim das rotas de perfil ___
module.exports = router;