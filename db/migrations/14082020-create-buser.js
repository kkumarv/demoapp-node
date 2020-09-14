module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('busers', {
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
  
      });
    },
    down: (queryInterface) => queryInterface.dropTable('busers'),
  };
  