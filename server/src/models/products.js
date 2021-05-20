'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {

    static associate(models) {
      Products.hasMany(models.PurchasesDetails,{as:"productPuchase",foreignKey:"ProductId"});
      Products.hasOne(models.Inventories,{as:"inventorie",foreignKey: "ProductId"});
      Products.hasOne(models.SalesDetails,{as:"ProductSaleDetail",foreignKey:"ProductId"});
      Products.belongsTo(models.Capacity,{as:"capacity", foreignKey : "CapacityId"});
      Products.belongsTo(models.TradeMarks, {as: "Marks", foreignKey: "TradeMarkId"});
    }
  };
  Products.init({
    Name: {
      type : DataTypes.STRING,
      allowNull : false
    },
    NormalPrice: {
      type : DataTypes.DECIMAL,
      allowNull : false
    },
    SubsidyPrice: DataTypes.DECIMAL,
    Type: {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    IsDelete: {
      type :DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    sequelize,
    modelName: 'Products',
    timestamps : false
  });

  Products.afterCreate(async (product, options) =>{
    await sequelize.models.Inventories.create({ProductId:product.id},{transaction: options.transaction});
  });
  Products.afterBulkUpdate(async (product, options) => {
    const id = product.where.id;
    const Delete = product.attributes.IsDelete;
    if(Delete === true) await sequelize.models.Inventories.update({IsDelete:true},{where:{id}});
  })
  return Products;
};