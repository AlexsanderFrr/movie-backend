const express = require('express');
const router = express.Router();

//pegamos a entidade em si dessa forma usando .Genres
const Genres = require('../models').Genres;

//Cadastra Gênero (POST)
router.post('/add', async (req, res) => {
    try {
        const { genre } = req.body;
        const newEdit = await Genres.create({ genre })
        res.status(200).json({ message: 'Gênero Cadastrado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar todos os Gêneros
router.get('/all', async (req, res) => {
    try {
        const genres = await Genres.findAll();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Alterar Gênero por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { genre } = req.body;
        await Genres.update(
            { genre },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json({ message: 'Gênero Atualizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Deletar Gênero por id (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Genres.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Gênero Excluído com sucesso' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;