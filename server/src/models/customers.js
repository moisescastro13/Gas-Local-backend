'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate(models) {
      Customers.hasMany(models.CustomersAddress, {as: "address", foreignKey: "CustomerId"});
      Customers.hasMany(models.CustomersPhoneNumbers,{as:"phoneNumber", foreignKey : "CustomerId"});
      Customers.hasMany(models.Sales,{as:"sale",foreignKey:"CustomerId"});
    }
  };
  Customers.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false
    },
    nit: {
      type : DataTypes.STRING,
      allowNull: false,
      unique : true,
      validate: {
        isNumeric: true
      }
    },
    nrc: {
      type : DataTypes.STRING
    },
    state: {
      type : DataTypes.STRING,

    },
    activity: {
      type : DataTypes.STRING,

    },
    addressDocument: {
      type : DataTypes.STRING
    },
    IsDelete: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    modelName: 'Customers',
    timestamps: false
  });
  return Customers;
};