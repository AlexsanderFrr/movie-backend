'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    nick: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    pwd: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPwd = bcrypt.hashSync(value, bcrypt.genSaltSync(10)); // Criptografa a senha usando bcrypt
        this.setDataValue('pwd', hashedPwd);
      }
    }
  }, {});
  
  Users.associate = function(models) {
    // associações de modelos, se houver
  };
  
  return Users;
};
