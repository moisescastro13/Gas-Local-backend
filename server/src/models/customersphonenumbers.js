'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomersPhoneNumbers extends Model {

    static associate(models) {
      CustomersPhoneNumbers.belongsTo(models.Customers,{as:"phoneNumber", foreignKey : "CustomerId"});
    }
  };
  CustomersPhoneNumbers.init({
    PhoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        isAlphanumeric: true
      }
    },
    IsDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'CustomersPhoneNumbers',
    timestamps: false
  });
  return CustomersPhoneNumbers;
};