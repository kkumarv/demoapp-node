module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('transactions', {
        transaction_id: {
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
      });
    },
    down: (queryInterface) => queryInterface.dropTable('transactions'),
  };
  