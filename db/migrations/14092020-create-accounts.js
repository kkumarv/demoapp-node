module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('accounts', {
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
      });
    },
    down: (queryInterface) => queryInterface.dropTable('accounts'),
  };
  