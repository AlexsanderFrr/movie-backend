const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//pegamos a entidade em si dessa forma usando .Genres
const Movies = require('../models').Movies;

//Cadastra Filme (POST)
router.post('/add', async (req, res) => {
    try {
        const { titulo, imagem, sinopse, rate_avg, data_lancamento } = req.body;
        const newEdit = await Movies.create({ titulo, imagem, sinopse, rate_avg, data_lancamento })
        res.status(200).json({ message: 'Filme Cadastrado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar todos os Filmes
router.get('/all', async (req, res) => {
    try {
        const movies = await Movies.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Busca Por id do Filme (GET)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params;
        const movie = await Movies.findByPk(req.params.id);
        res.status(200).json(movie);
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

//Alterar Filme por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { titulo, imagem, sinopse, rate_avg, data_lancamento } = req.body;
        await Movies.update(
            { titulo, imagem, sinopse, rate_avg, data_lancamento },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json({ message: 'Filme Atualizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Deletar Filme por id (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Movies.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Filme Excluído com sucesso' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;