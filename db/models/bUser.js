/* jshint indent: 2 */

module.exports = (sequelize, Sequelize) => {
    const Buser = sequelize.define('Buser', {
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
      mob_num: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'busers',
    });

    Buser.associate = (models) => {
      Buser.belongsToMany(models.Accounts, {
        through: 'Buser', foreignKey: 'user_id', onDelete: 'cascade', as: 'users',
      });
    };
  
    return Buser;
  };
  