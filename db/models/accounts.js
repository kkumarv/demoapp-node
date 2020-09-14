/* jshint indent: 2 */

module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define('Accounts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      account_no: {
        unique: 'account_no',
        type: Sequelize.TEXT,
        allowNull: false,
      },
      balance: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'accounts',
    });
    Accounts.associate = (models) => {
        Accounts.belongsToMany(models.Buser, {
          through: 'Accounts', foreignKey: 'user_id', onDelete: 'cascade', as: 'users',
        });
    };    
    return Accounts;
  };
  