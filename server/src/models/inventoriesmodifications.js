'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoriesModifications extends Model {

    static associate(models) {
      InventoriesModifications.belongsTo(models.Inventories,{as:"inventorieModifications",foreignKey:"InventoryId"});
    }
  };
  InventoriesModifications.init({
    QuantityBefore: {
      type :DataTypes.INTEGER,
      allowNull: false
    },
    QuantityAfter: {
      type :DataTypes.INTEGER,
      allowNull: false
    },
    TotalBefore:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalAfter:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Reason: {
      type :DataTypes.STRING,
      allowNull: false
    },
    ModifyBy: {
      type :DataTypes.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'InventoriesModifications',
  });
  return InventoriesModifications;
};


