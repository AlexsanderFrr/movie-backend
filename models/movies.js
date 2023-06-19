'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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