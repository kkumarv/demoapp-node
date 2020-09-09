/* jshint indent: 2 */

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        unique: 'username',
        type: Sequelize.TEXT,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'users',
    });
  
    return User;
  };
  