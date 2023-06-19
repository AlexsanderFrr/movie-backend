'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesGenres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MoviesGenres.init({
    id_movies: DataTypes.INTEGER,
    id_genres: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesGenres',
  });
  return MoviesGenres;
};