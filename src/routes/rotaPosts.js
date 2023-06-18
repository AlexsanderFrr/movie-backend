const express = require('express');
const router = express.Router();

const Posts = require('../models/Posts');

// Rota para obter todos os filmes
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo filme
router.post('/', async (req, res) => {
  const { titulo, imagem, texto, categoria, classificacao } = req.body;
  try {
    const posts = await Posts.create({ titulo, imagem, texto, categoria, classificacao });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Outras rotas...

module.exports = router;
