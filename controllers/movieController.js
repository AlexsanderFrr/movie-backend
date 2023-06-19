const express = require('express');
const router = express.Router();

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