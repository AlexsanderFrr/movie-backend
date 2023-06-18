const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//vamos carregar nosso modelo
const Genres = require('../models/Genres');

// Rota para criar um novo Genero
router.post('/add', async (req, res) => {
    try {
        const genre = await Genres.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter todos os Generos
router.get('/all', async (req, res) => {
    try {
        const genre = await Genres.findAll();
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um Genero específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genres.findOne({ where: { id_genre: id } });
        if (genre) {
            res.json(genre);
        } else {
            throw new Error('Gênero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rota para buscar um Genero através do nome
router.get('/genre/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const genre = await Genres.findAll({
            where: {
                genre: {
                    [Op.like]: `%${title}%` // Usando o operador LIKE com o Sequelize
                }
            }
        });
        if (genre.length > 0) {
            res.json(genre);
        } else {
            throw new Error('Nenhum Genero encontrado com o texto fornecido');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um Genero existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Genres.update(req.body, {
            where: { id_genre: id }
        });
        if (updated) {
            const genre = await Genres.findOne({ where: { id_genre: id } });
            res.json(genre);
        } else {
            throw new Error('Gênero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para excluir um Genero específico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Genres.destroy({
            where: { id_genre: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Gênero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//__ Fim das rotas de Genres ___
module.exports = router;