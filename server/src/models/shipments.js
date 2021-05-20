'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipments extends Model {
   
    static associate(models) {
      Shipments.belongsTo(models.Sales, {as:"shipment",foreignKey:"SaleId"});
    }
  };
  Shipments.init({
    Direction: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ContactNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Shipments',
  });
  return Shipments;
};