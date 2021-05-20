const { salesDetailsBulk, TotalSale } = require('../Helpers/SalesDetails');
const { sequelize, Sales, SalesDetails, Shipments, Inventories } = require('../models/index');
const controller = {};

controller.newSale = async (req, res) => {

    const {  Correlative,CustomerId, CustomerName, CashTender, salesDetails, shipment  } = req.body;
    try {
      
      const transaction = sequelize.transaction(async t =>{
        for(let detail of salesDetails){
          const inventories = await Inventories.findOne({where:{ProductId:detail.ProductId}},{transaction:t});
          if(inventories.Quantity < detail.Quantity) 
          {
            return res.status(401).json({Err:`La cantidad de ${detail.ProductName} que quieres comprar es mayor a la cantiad en inventario`});
          }
          await Inventories.update({Quantity:inventories.Quantity-detail.Quantity},{where:{ProductId:detail.ProductId},transaction:t});
        }
        const Total = TotalSale(salesDetails);
        const sale = await Sales.create({Correlative,CustomerId, CustomerName, Total, CashTender},{transaction:t});
        const SalesDetailsBulk = salesDetailsBulk(salesDetails,sale.id);
        const salesDetail = await SalesDetails.bulkCreate(SalesDetailsBulk,{transaction:t});

        if (shipment) await Shipments.create({SaleId:sale.id,Direction:shipment.Direction,ContactNumber:shipment.ContactNumber},{transaction:t});
        
        res.status(200).json({
          sale,
          salesDetail
        });
      }); 
    } 
    catch(e) {
      res.json(e);
    }
  }
  
  controller.getAllSales = async (req, res) => {
    try { 
      sales = await Sales.findAll({
        include:[{
          model: SalesDetails,
          as: "saleDetail"
        }
        ]});
      res.status(201).json(sales);
    }
    catch (e)
    {
      res.json(e);
    }
  }
  
  controller.getOneSale = async (req, res) => {
    const id = req.params.id;
    try { 
      const sales = await Sales.findOne({
        where:{id},
        include:[{
          model: SalesDetails,
          as: "saleDetail"
        }]
      });
      if(!sales) return res.status(401).json({Err:"La venta no existe"});

      res.status(201).json(sales); 
    }
    catch (e)
    {
      res.json(e);
    }
  }
  
  controller.updateSale = async (req, res) => {
    const {  name, description } = req.body;
    const id = req.params.id;
  
    try { 
      
    }
    catch (e)
    {
      res.json(e);
    }
  } 
  
  controller.deleteSale = async (req, res) => {
    const id = req.params.id;
    try { 
      Sales.update({IsDelete:true},{where:{id}})
      .then((result) =>{
        res.json("todo nice");
      }).catch((err) =>{
        res.json(e);
      });
    }
    catch (e)
    {
      res.json(e);
    }
  }


module.exports = controller;