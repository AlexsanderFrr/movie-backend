const db = require('./db');
const bcrypt = require('bcryptjs');

const Users = db.sequelize.define('Users', {
  id_user: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nick: {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  },
  pwd: {
    type: db.Sequelize.STRING
  }
}, { freezeTableName: true });

// Antes de salvar o usuário no banco de dados, criptografa a senha
Users.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.pwd, salt);
  user.pwd = hash;
});

// Verifica se a senha fornecida pelo usuário corresponde à senha criptografada no banco de dados
Users.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.pwd);
};

// Comentado para evitar recriação da tabela
//Users.sync({ force: true }); 

module.exports = Users;
