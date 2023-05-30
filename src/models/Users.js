const db = require('./db');

const Users = db.sequelize.define('Users', {
    id_user: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nick: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    pwd: {
        type: db.Sequelize.STRING
    }
    
}, { freezeTableName: true });

//Users.sync({ force: true });

module.exports = Users;