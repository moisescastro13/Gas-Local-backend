'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventories extends Model {

    static associate(models) {
      Inventories.belongsTo(models.Products,{as:"inventorie",foreignKey: "ProductId"});
      Inventories.hasMany(models.InventoriesModifications,{as:"inventorieModifications",foreignKey:"InventoryId"});
    }
  };
  Inventories.init({
    Quantity: {
      type :DataTypes.INTEGER,
      defaultValue : 0,
      validate: {
        min: 0,
        isNumeric: true
      }
    },
    Total : {
      type :DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        isNumeric: true
      }
    },
    Cost: { 
      type : DataTypes.DECIMAL,
      defaultValue : 0,
      validate: {
        isNumeric: true
      }
    },
    IsDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Inventories',
    timestamps: false
  });
  return Inventories;
};