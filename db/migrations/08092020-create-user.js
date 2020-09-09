module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
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
  
      });
    },
    down: (queryInterface) => queryInterface.dropTable('users'),
  };
  