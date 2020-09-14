/* jshint indent: 2 */

module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('Transaction', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      account_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      payment_details: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      tableName: 'transactions',
    });
    Transaction.associate = (models) => {
        Transaction.belongsToMany(models.Accounts, {
          through: 'Accounts', foreignKey: 'account_no', onDelete: 'cascade', as: 'account',
        });
    };    
    return Transaction;
  };
  