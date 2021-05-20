'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Providers extends Model {

    static associate(models) {
      Providers.hasMany(models.Purchases,{as:"provider",foreignKey:"ProviderId"});
    }
  };
  Providers.init({
    name: DataTypes.STRING,
    contactName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:true
      },
      unique: {
          args: true,
          msg: 'Este email ya existe en la base de datos.'
      }
    },
    IsDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Providers',
  });
  return Providers;
};