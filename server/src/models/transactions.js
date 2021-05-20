'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {

    static associate(models) {
      
    }
  };
  Transactions.init({
    referencen: {
      type :DataTypes.STRING,
      allowNull: true
    },
    Amount: {
      type :DataTypes.DECIMAL,
      allowNull: false
    },
    Type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};