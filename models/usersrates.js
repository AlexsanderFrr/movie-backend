'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersRates.init({
    rate: DataTypes.FLOAT,
    data_rate: DataTypes.DATE,
    id_movies: DataTypes.INTEGER,
    id_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersRates',
  });
  return UsersRates;
};