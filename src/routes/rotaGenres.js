const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//vamos carregar nosso modelo
const Genres = require('../models/Genres');

// Rota para criar um novo Genero
router.post('/add', async (req, res) => {
    try {
        const movie = await Movies.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//__ Fim das rotas de Genres ___
module.exports = router;