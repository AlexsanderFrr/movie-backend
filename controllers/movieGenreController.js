const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

//pegamos a entidade em si dessa forma usando moviegenres
const MoviesGenres = require('../models').MoviesGenres;

//Rota para criar um novo movie_genre
router.post('/add/:id_movies/:id_genres', async (req, res) => {
    try {
        const { id_movies, id_genres } = req.params;
        const movieGenre = await MoviesGenres.create({ id_movies, id_genres });
        res.json(movieGenre);       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rota para buscar todos os filmes e seus generos
router.get('/all', async (req, res) => {
    try {
        const movieGenre = await MoviesGenres.sequelize.query("select * from select_movie_genre_all", {type: MoviesGenres.sequelize.QueryTypes.SELECT});
        res.json(movieGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Rota para obter um filme específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movieGenre = await MoviesGenres.sequelize.query("select * from select_movie_genre_all where id=:id", { replacements: { id: id }, type: MoviesGenres.sequelize.QueryTypes.SELECT });
        if (movieGenre) {
            res.json(movieGenre);
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
        const [updated] = await MoviesGenres.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const movieGenre = await MoviesGenres.sequelize.query("select * from select_movie_genre_all where id=:id", { replacements: { id: id }, type: MoviesGenres.sequelize.QueryTypes.SELECT });
            res.json(movieGenre);
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
        const deleted = await MoviesGenres.destroy({
            where: { id: id }
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
module.exports = router;