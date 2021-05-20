'use strict';
const {
  Model
} = require('sequelize');
const inventories = require('./inventories');
module.exports = (sequelize, DataTypes) => {
  class PurchasesDetails extends Model {

    static associate(models) {
      PurchasesDetails.belongsTo(models.Products,{as:"productPuchase",foreignKey:"ProductId"});
      PurchasesDetails.belongsTo(models.Purchases,{as:"purchasedetail",foreignKey:"PurchaseId"});
    }
  };
  PurchasesDetails.init({
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchasesDetails',
  });

  return PurchasesDetails;
};