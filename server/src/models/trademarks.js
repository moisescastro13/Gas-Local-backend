'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TradeMarks extends Model {

    static associate(models) {
      TradeMarks.hasMany(models.Products, {as: "Marks", foreignKey: "TradeMarkId"});
    }
  };
  TradeMarks.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  }, {
    sequelize,
    modelName: 'TradeMarks',
    timestamps: false
  });
  return TradeMarks;
};