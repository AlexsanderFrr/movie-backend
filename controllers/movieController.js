const express = require('express');
const multer = require('multer');
const { Op } = require('sequelize');
const router = express.Router();
const randomNumber = Math.floor(Math.random() * 1000000);
const timestamp = new Date().getTime();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    // Adiciona um identificador único no início do nome do arquivo
    const uniqueIdentifier = `${timestamp}_${randomNumber}_`;
    const newFileName = uniqueIdentifier + file.originalname;
    cb(null, newFileName);
  }
});

const upload = multer({ storage });

const Movies = require('../models').Movies;

// Adicionar filme
router.post('/add', upload.single('imagem'), async (req, res) => {
    try {
        const { titulo, sinopse, data_lancamento } = req.body;

        // Use o novo nome do arquivo que inclui o identificador único
        const newEdit = await Movies.create({ titulo, sinopse, data_lancamento, imagem: req.file.filename });

        res.status(200).json({ message: 'Filme Cadastrado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar todos os Filmes
router.get('/all', async (req, res) => {
    try {
        const movies = await Movies.findAll();

        const moviesWithImagePaths = movies.map(movie => {
            if (movie.imagem) {
                const imagePath = `/img/${movie.imagem}`;
                return {
                    ...movie.dataValues,
                    imagem: imagePath,
                };
            } else {
                return { ...movie.dataValues, imagem: null };
            }
        });

        res.status(200).json(moviesWithImagePaths);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});


// Busca Por id do Filme (GET)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movies.findByPk(id);

        if (!movie) {
            throw new Error('Filme não encontrado');
        }

        const imagePath = movie.imagem ? `/img/${movie.imagem}` : null;

        const movieWithImagePath = {
            ...movie.dataValues,
            imagem: imagePath,
        };

        res.status(200).json(movieWithImagePath);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para buscar um filme através do título
router.get('/title', async (req, res) => {
    const { title } = req.query; // Obtenha o título da consulta

    try {
        const movies = await Movies.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${title}%`
                }
            }
        });

        const moviesWithImagePaths = movies.map(movie => {
            const imagePath = movie.imagem ? `/img/${movie.imagem}` : null;
            return {
                ...movie.dataValues,
                imagem: imagePath,
            };
        });

        if (moviesWithImagePaths.length > 0) {
            res.json(moviesWithImagePaths);
        } else {
            throw new Error('Nenhum filme encontrado com o título fornecido');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Alterar Filme por ID (PUT)
router.put('/:id', upload.single('imagem'), async (req, res) => {
    try {
        const { titulo, sinopse, data_lancamento } = req.body;

        // Use o novo nome do arquivo que inclui o identificador único
        const imagem = req.file ? req.file.filename : undefined;

        await Movies.update(
            { titulo, sinopse, data_lancamento, imagem },
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