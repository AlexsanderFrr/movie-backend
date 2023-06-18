const db = require('./db');

const Genres = db.sequelize.define('Genres', {
  id_genre: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  genre: {
    type: db.Sequelize.STRING
  }

}, { freezeTableName: true });

//Genres.sync({ force: true });

module.exports = Genres;