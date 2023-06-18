const db = require('./db');

const Users_rates = db.sequelize.define('Users_rates', {
  id_user_rate: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  rate: {
    type: db.Sequelize.FLOAT
  },
  data_rate: {
    type: db.Sequelize.DATE
  },
  id_movie: {
    type: db.Sequelize.INTEGER,
    references: { model: 'Movies', key: 'id_movie' },
    onDelete: 'CASCADE',
    allowNull: false,
},
id_user: {
    type: db.Sequelize.INTEGER,
    references: { model: 'Users', key: 'id_user' },
    onDelete: 'CASCADE',
    allowNull: false,
},

}, { freezeTableName: true });

//Users_rates.sync({ force: true });

module.exports = Users_rates;