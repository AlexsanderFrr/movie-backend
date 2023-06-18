const db = require('./db');

const Posts = db.sequelize.define('Posts', {
  id_post: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: db.Sequelize.STRING
  },
  imagem: {
    type: db.Sequelize.STRING
  },
  texto: {
    type: db.Sequelize.STRING
  },
  categoria: {
    type: db.Sequelize.STRING
  },
  classificacao: {
    type: db.Sequelize.FLOAT
  }

}, { freezeTableName: true });

//Posts.sync({ force: true });

module.exports = Posts;