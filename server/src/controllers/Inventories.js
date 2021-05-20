const { sequelize, Inventories, InventoriesModifications } = require('../models/index');

const controller = {};

controller.getAllInventories = async (req, res) => {
  try {
    inventories = await Inventories.findAll({
      where: {IsDelete: false},
      include : [
        {model: InventoriesModifications,
        as: "inventorieModifications"}
      ]
    });
    res.status(200).json(inventories);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getOneInventorie = async (req, res) => {
  const id = req.params.id;
  try {
    inventorie = await Inventories.findOne({
      where: { id, IsDelete: false },
      include : [
        {model: InventoriesModifications,
        as: "inventorieModifications"}
      ]
    });
    if (!inventorie) return res.status(404).json({ Err: "El inventario no existe" });
    res.status(200).json(inventorie);
  }
  catch (e) {
    res.json(e);
  }
}

controller.updateInventorie = async (req, res) => {
  const { Quantity,Total,Cost, Reason, ModifyBy } = req.body;
  const id = req.params.id;
  const inventorie = await Inventories.findOne({where: { id, IsDelete: false }});
  if (!inventorie) return res.json({ Err: "El inventario no existe" }); 
  try {
    const UpdatedInventorie = await Inventories.update({ Quantity, Total, Cost},{where: {id}});
    const transaction = sequelize.transaction(async t =>  {
       const UpdatedInventorie = await Inventories.update({ Quantity, Total, Cost},{where: {id},returning:true,transaction: t});
        const inventorieModification = await InventoriesModifications.create({
            InventoryId: id, QuantityBefore:inventorie.Quantity,QuantityAfter:Quantity,
            TotalBefore:inventorie.Total,TotalAfter:Total,Reason,ModifyBy
        },{transaction: t});

      res.status(200).json({
        UpdatedInventorie,
        inventorieModification
      });
    });
  }
  catch (e) {
    res.json(e);
  }
}

module.exports = controller;