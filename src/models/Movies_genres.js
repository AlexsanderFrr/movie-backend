const db = require('./db');

const Movies_genres = db.sequelize.define('Movies_genres', {
  id_movies_genres: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_movies: {
    type: db.Sequelize.INTEGER,
    references: { model: 'Movies', key: 'id_movies' },
    onDelete: 'CASCADE',
    allowNull: false,
},
id_genre: {
    type: db.Sequelize.INTEGER,
    references: { model: 'Genres', key: 'id_genre' },
    onDelete: 'CASCADE',
    allowNull: false,
},

}, { freezeTableName: true });

//Movies_genres.sync({ force: true });

module.exports = Movies_genres;