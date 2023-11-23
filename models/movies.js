'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    static associate(models) {
    }
  }
  Movies.init({
    titulo: DataTypes.STRING,
    imagem: DataTypes.STRING,
    sinopse: DataTypes.TEXT,
    rate_avg: DataTypes.FLOAT,
    data_lancamento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};