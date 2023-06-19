const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//pegamos a entidade em si dessa forma usando .Genres
const UsersRates = require('../models').UsersRates;

//Rota para criar um novo UsersRates
router.post('/add/:id_movies/:id_users', async (req, res) => {
    const { id_movies, id_users } = req.params;
    const { rate, data_rate } = req.body;
    try {
        const newRate = await UsersRates.create({
            rate: rate,
            data_rate: data_rate,
            id_movies: id_movies,
            id_users: id_users
        });
        res.json(newRate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rota para buscar todos os rates dos usuarios
router.get('/all', async (req, res) => {
    try {
        const usersRates = await UsersRates.sequelize.query("select * from select_users_rates_all", { type: UsersRates.sequelize.QueryTypes.SELECT });
        res.json(usersRates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um user_rate especifico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user_rate = await UsersRates.sequelize.query("select * from select_users_rates_all where id=:id", { replacements: { id: id }, type: UsersRates.sequelize.QueryTypes.SELECT });
        if (user_rate) {
            res.json(user_rate);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um rate de filme
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await UsersRates.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const user_rate = await UsersRates.sequelize.query("select * from select_users_rates_all where id=:id", { replacements: { id: id }, type: UsersRates.sequelize.QueryTypes.SELECT });
            res.json(user_rate);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//rota para deletar um rate
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await UsersRates.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;