const bcrypt = require('bcryptjs');
const User = require('../models/Users');

// Função para cadastrar um novo usuário
exports.registerUsers = async (req, res) => {
  const { nick, email, pwd } = req.body;

  try {
    // Verificar se o e-mail já está cadastrado
    const existingUsers = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pwd, salt);

    const newUsers = await Users.create({ email, pwd: hash, nick });
    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para fazer o login do usuário
exports.loginUser = async (req, res) => {
  const { email, pwd } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário e/ou senha incorretos' });
    }

    const isMatch = bcrypt.compareSync(password, user.pwd);
    if (isMatch) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Usuário e/ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
