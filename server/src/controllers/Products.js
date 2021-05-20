
const { sequelize, Products, Capacity, TradeMarks, Inventories } = require('../models/index');

const controller = {};

controller.newProduct = async (req, res) => {
  const { Name, TradeMarkId, CapacityId, NormalPrice, SubsidyPrice, Type, Total } = req.body;

  try {
    if (Type === 0 && !CapacityId) {
      return res.status(401).json({ Err: "Debes selecionar una capacidad" });
    }
    else if (Type === 0 && !Total) {
      return res.status(401).json({ Err: "El total no puede ser nulo o 0 " });
    }
    else if (Type === 1 && Total) {
      return res.status(401).json({ Err: "Los productos no son cilindros xd " });
    }
    else {
      const transaction = sequelize.transaction(async (t) => {
        product = await Products.create({ Name, TradeMarkId, CapacityId, NormalPrice, SubsidyPrice, Type }, { transaction: t });
        if (Type === 0) await Inventories.update({ Total }, { where: { ProductId: product.id }, transaction: t });

        res.status(201).json(product);
      });
    }
  }
  catch (e) {
    res.json(e);
  }
}

controller.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { IsDelete: false },
      include: [{
        model: Capacity,
        as: "capacity"
      }, {
        model: TradeMarks,
        as: "Marks"
      }]
    });
    if (!products) return res.json({ Err: "No existe ningun producto" });
    res.status(200).json(products);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findOne({
      where: { id, IsDelete: false },
      include: [{
        model: Capacity,
        as: "capacity"
      }, {
        model: TradeMarks,
        as: "Marks"
      }]
    });
    if (!product) return res.json({ Err: "El producto no existe" });
    res.status(200).json(product);
  }
  catch (e) {
    res.json(e);
  }
}

controller.updateProduct = async (req, res) => {
  const { Name, TradeMarkId, NormalPrice, SubsidyPrice } = req.body;
  const id = req.params.id;
  const Updatedproduct = await Products.findOne({ where: { id }, IsDelete: false });
  if (!Updatedproduct) return res.status(404).json({ Err: "El producto no existe" });
  try {
    const transaction = sequelize.transaction(async t => {
      const product = await Products.update({ Name, TradeMarkId, NormalPrice, SubsidyPrice},
        { where: { id }, returning: true, transaction: t });
      res.status(200).json(product);
    });
  }
  catch (e) {
    res.json(e);
  }
}

controller.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = sequelize.transaction(async t => {
      result = await Products.update({ IsDelete: true }, { where: { id }, transaction: t });

      if(result[0] === 0) return res.json({Err:"El producto no existe"});
      res.status(200).json({
        good: "todo salio bien v",
        result
      });
    });
  }
  catch (e) {
    res.json(e);
  }
}


module.exports = controller;