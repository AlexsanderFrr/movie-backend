const db = require('./db');

const Movies = db.sequelize.define('Movies', {
  id_movie: {
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
  sinopse: {
    type: db.Sequelize.STRING
  },
  rate_avg: {
    type: db.Sequelize.FLOAT,
    allowNull: true
  },
  data_lancamento: {
    type: db.Sequelize.DATE
  }

}, { freezeTableName: true });

//Movies.sync({ force: true });

module.exports = Movies;