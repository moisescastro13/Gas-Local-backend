'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Capacity extends Model {

    static associate(models) {
      Capacity.hasOne(models.Products, {as:"capacity", foreignKey : 'CapacityId'});
    }
  };
  Capacity.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Capacity',
    timestamps: false
  });
  return Capacity;
};