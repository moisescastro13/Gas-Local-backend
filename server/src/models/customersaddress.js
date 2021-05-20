'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomersAddress extends Model {
    static associate(models) {
      
      CustomersAddress.belongsTo(models.Customers,{as:'address', foreignKey : "CustomerId"});
    }
  };
  CustomersAddress.init({
    Address: {
      type : DataTypes.STRING,
      allowNull : false

    },
    IsDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'CustomersAddress',
    timestamps: false
  });
  return CustomersAddress;
};