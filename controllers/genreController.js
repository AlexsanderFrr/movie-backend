const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

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

//Busca Por id a Gêneros (GET)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params;
        const genre = await Genres.findByPk(req.params.id);
        res.status(200).json(genre);
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