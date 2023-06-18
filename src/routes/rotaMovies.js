const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//vamos carregar nosso modelo
const Movies = require('../models/Movies');

// Rota para criar um novo Movie
router.post('/add', async (req, res) => {
    try {
        const movie = await Movies.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter todos os Movies
router.get('/all', async (req, res) => {
    try {
        const movie = await Movies.findAll();
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um filme específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movies.findOne({ where: { id_movie: id } });
        if (movie) {
            res.json(movie);
        } else {
            throw new Error('Filme não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rota para buscar um filme através do titulo
router.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const movie = await Movies.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${title}%` // Usando o operador LIKE com o Sequelize
                }
            }
        });
        if (movie.length > 0) {
            res.json(movie);
        } else {
            throw new Error('Nenhum filme encontrado com o título fornecido');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um Filme existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Movies.update(req.body, {
            where: { id_movie: id }
        });
        if (updated) {
            const movie = await Movies.findOne({ where: { id_movie: id } });
            res.json(movie);
        } else {
            throw new Error('Filme não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para excluir um Usuario específico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Movies.destroy({
            where: { id_movie: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Filme não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



//__ Fim das rotas de Movies ___
module.exports = router;