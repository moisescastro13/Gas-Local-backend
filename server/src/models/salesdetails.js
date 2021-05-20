'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesDetails extends Model {

    static associate(models) {
      SalesDetails.belongsTo(models.Sales,{as:"saleDetail",foreignKey:"SaleId"});
      SalesDetails.belongsTo(models.Products,{as:"ProductSaleDetail",foreignKey:"ProductId"});
    }
  };
  SalesDetails.init({
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UnitCost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    Discount: {
      type: DataTypes.DECIMAL
    },
    HasSubsidy: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SalesDetails',
  });
  return SalesDetails;
};