'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      referencen: {
        type :Sequelize.STRING,
        allowNull: true
      },
      Amount: {
        type :Sequelize.DECIMAL,
        allowNull: false
      },
      Type: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IsDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
