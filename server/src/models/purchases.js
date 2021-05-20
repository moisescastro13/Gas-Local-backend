'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    static associate(models) {
      Purchases.hasMany(models.PurchasesDetails,{as:"purchasedetail",foreignKey:"PurchaseId"});
      Purchases.belongsTo(models.Providers,{as:"provider",foreignKey:"ProviderId"});
    }
  };
  Purchases.init({
    Document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ReceiptPhoto: DataTypes.STRING,
    IsDelete:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    sequelize,
    modelName: 'Purchases'
  });
  return Purchases;
};