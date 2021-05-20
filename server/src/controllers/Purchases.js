const { sequelize, Purchases, PurchasesDetails, Inventories } = require('../models/index');
const { FormatDataToBulk, AmountResult } = require('../Helpers/PurchasesDetails');

const controller = {};

controller.newPurchase = async (req, res) => {
  const { ProviderId, Document, ReceiptPhoto, ProductsDetails } = req.body;

  try {
    const transaction = sequelize.transaction(async t => {
      const purchase = await Purchases.create({ Document, ReceiptPhoto, ProviderId }, { transaction: t });
      const Bulkpurchasesdetails = FormatDataToBulk(ProductsDetails, purchase.id);
      const Amount = AmountResult(ProductsDetails);
      purchaseResult = await Purchases.update({Amount},{ where:{id:purchase.id},returning:true, plain:true, transaction: t });

      const purchasesDetail = await PurchasesDetails.bulkCreate(Bulkpurchasesdetails, { transaction: t });

      for(const detail of purchasesDetail){
        const inventorie = await Inventories.findOne({ where: { ProductId: detail.ProductId } }, { transaction: t });
        let newQuantity = inventorie.Quantity + detail.Quantity;
        if (inventorie.Total) {
          if (detail.Quantity > (inventorie.Total - inventorie.Quantity)) {
            await Inventories.update({ Total: newQuantity,Quantity: newQuantity }, { where: { ProductId: detail.ProductId }, transaction: t });
          } else {   
            await Inventories.update({ Quantity: newQuantity }, { where: { ProductId: detail.ProductId }, transaction: t });
          }
        } else {
          await Inventories.update({ Quantity: newQuantity }, { where: { ProductId: detail.ProductId }, transaction: t });
        }
      }
      res.status(200).json({
        purchaseResult,
        purchasesDetail
      });
    });
  }
  catch (e) {
    res.json(e);
  }
}

controller.getAllPurchases = async (req, res) => {
  try {
    purchasesdetails = await Purchases.findAll({
      where: { IsDelete: false },
      include: [{
        model: PurchasesDetails,
        as: "purchasedetail"
      }]
    });
    res.status(200).json(purchasesdetails);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getOnePurchase = async (req, res) => {
  const id = req.params.id;
  try {
    purchasesdetail = await Purchases.findOne({
      where: { id, IsDelete: false },
      include: [{
        model: PurchasesDetails,
        as: "purchasedetail"
      }]
    });
    if (!purchasesdetail) return res.status(404).json({ Err: "La compra no existe" });
    res.status(200).json(purchasesdetail);
  }
  catch (e) {
    res.json(e);
  }
}

controller.updatePurchase = async (req, res) => {
  const {  ReceiptPhoto } = req.body;
  const id = req.params.id;
  const purchase = await Purchases.findOne({
    where: { id, IsDelete: false }
  });
  if (!purchase) return res.json({ Err: "La compra no existe" });
  try {
    transaction = sequelize.transaction(async t => {
      purchase = await Purchases.update({  ReceiptPhoto }, { where: { id }, returning: true, transaction: t });
      
      res.status(200).json(purchase);
    });
  }
  catch (e) {
    res.json(e);
  }
}

controller.deletePurchase = async (req, res) => {
  const id = req.params.id;
  try {
    result = Purchases.update({ IsDelete: true }, { where: { id }, returning: true });
    res.json(result);
  }
  catch (e) {
    res.json(e);
  }
}
module.exports = controller;