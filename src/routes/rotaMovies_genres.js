const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//vamos carregar nosso modelo
const Movies_genres = require('../models/Movies_genres');

//Rota para criar um novo movie_genre
router.post('/add/:id_movie/:id_genre', async (req, res) => {
    try {
        const { id_movie, id_genre } = req.params;
        const movieGenre = await Movies_genres.create({ id_movie, id_genre });
        res.json(movieGenre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Rota para buscar todos os filmes e seus generos
router.get('/all', async (req, res) => {
    try {
        const movie_genre = await Movies_genres.sequelize.query("select * from select_movie_genre_all", {type: Movies_genres.sequelize.QueryTypes.SELECT});
        res.json(movie_genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um filme específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movie_genre = await Movies_genres.sequelize.query("select * from select_movie_genre_all where id_movie_genre=:id", { replacements: { id: id }, type: Movies_genres.sequelize.QueryTypes.SELECT });
        if (movie_genre) {
            res.json(movie_genre);
        } else {
            throw new Error('Filme e genero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um filme específico
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Movies_genres.update(req.body, {
            where: { id_movie_genre: id }
        });
        if (updated) {
            const movie_genre = await Movies_genres.sequelize.query("select * from select_movie_genre_all where id_movie_genre=:id", { replacements: { id: id }, type: Movies_genres.sequelize.QueryTypes.SELECT });
            res.json(movie_genre);
        } else {
            throw new Error('Filme e gênero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//rota para deletar um movies_genre
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Movies_genres.destroy({
            where: { id_movie_genre: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Filme e genero não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//__ Fim das rotas de Movies_genres ___
module.exports = router;