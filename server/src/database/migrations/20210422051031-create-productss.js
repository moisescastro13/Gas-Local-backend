'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productsses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      TrademarId: {
        type: Sequelize.INTEGER
      },
      CapacityId: {
        type: Sequelize.INTEGER
      },
      NormalPrice: {
        type: Sequelize.DECIMAL
      },
      SubsidyPrice: {
        type: Sequelize.DECIMAL
      },
      Type: {
        type: Sequelize.BOOLEAN
      },
      IsDelete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Productsses');
  }
};