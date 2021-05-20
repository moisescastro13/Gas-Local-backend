'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {

    static associate(models) {
      Sales.hasMany(models.SalesDetails, {as:"saleDetail",foreignKey:"SaleId"});
      Sales.hasOne(models.Shipments, {as:"shipment",foreignKey:"SaleId"});
      Sales.belongsTo(models.Customers,{as:"sale",foreignKey:"CustomerId"});
    }
  };
  Sales.init({
    Correlative: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    CustomerName: {
      type : DataTypes.STRING,
      allowNull : false
    },
    Total: {
      type : DataTypes.DECIMAL,
      allowNull : false
    },
    CashTender : DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};