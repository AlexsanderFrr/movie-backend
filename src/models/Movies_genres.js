const db = require('./db');

const Movies_genres = db.sequelize.define('Movies_genres', {
  id_movie_genre: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_movie: {
    type: db.Sequelize.INTEGER,
    references: { model: 'Movies', key: 'id_movie' },
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