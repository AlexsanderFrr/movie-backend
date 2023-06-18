const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


//vamos carregar nosso modelo
const Users_rates = require('../models/Users_rates');


//Rota para criar um novo users_rates
router.post('/add/:id_movie/:id_user', async (req, res) => {
    const { id_movie, id_user } = req.params;
    const { rate, data_rate } = req.body;
    try {
      const newRate = await Users_rates.create({
        rate: rate,
        data_rate: data_rate,
        id_movie: id_movie,
        id_user: id_user
      });
      res.json(newRate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //Rota para buscar todos os rates dos usuarios
router.get('/all', async (req, res) => {
    try {
        const users_rates = await Users_rates.sequelize.query("select * from select_users_rates_all", {type: Users_rates.sequelize.QueryTypes.SELECT});
        res.json(users_rates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um user_rate especifico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user_rate = await Users_rates.sequelize.query("select * from select_users_rates_all where id_user_rate=:id", { replacements: { id: id }, type: Users_rates.sequelize.QueryTypes.SELECT });
        if (user_rate) {
            res.json(user_rate);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um rate de filme
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Users_rates.update(req.body, {
            where: { id_user_rate: id }
        });
        if (updated) {
            const user_rate = await Users_rates.sequelize.query("select * from select_users_rates_all where id_user_rate=:id", { replacements: { id: id }, type: Users_rates.sequelize.QueryTypes.SELECT });
            res.json(user_rate);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//rota para deletar um rate
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Users_rates.destroy({
            where: { id_user_rate: id }
        });
        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error('Rate não encontrado');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


  


//__ Fim das rotas de Users_rates ___
module.exports = router;