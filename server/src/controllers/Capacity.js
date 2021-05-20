const { Capacity } = require('../models/index');

const controller = {};


controller.newCapacity = async (req, res) => {
  const {  name, description } = req.body;
  try {
    result = await Capacity.create({name,description});
    res.status(200).json(result);
  } 
  catch(e) {
    res.json(e);
  }
}

controller.getAllCapacitys = async (req, res) => {
  try { 
    result = await Capacity.findAll({
      where: {IsDelete : false} 
    });
    res.status(200).json(result);
  }
  catch (e)
  {
    console.log(e)
    res.json(e);
  }
}

controller.getOneCapacity = async (req, res) => {
  const id = req.params.id;
  try { 
    result = await Capacity.findAll({
      where : {
        id,
        IsDelete : false
      }
    });
    if(!result) res.json({Err : "La medida no existe"});
    res.status(200).json(result);
  }
  catch (e)
  {
    console.log(e)
    res.jsonCapacity
  }
}

controller.updateCapacity = async (req, res) => {
  const {  name, description } = req.body;
  const id = req.params.id;
  const capacity = await Capacity.findOne({
    where : {id:id, IsDelete : false}
  });
  if(!capacity) res.json({Err : "La medida no existe"});
  try { 
    result = await Capacity.update({name,description},{where : {id}, returning: true});
    res.status(200).json(result);
  }
  catch (e)
  {
    console.log(e)
    res.json(e);
  }
} 

controller.deleteCapacity = async (req, res) => {
  const id = req.params;
  try { 
    result = Capacity.update({ IsDelete: true },{ where:id });
    res.status(200).json({result:"OK"});
  }
  catch (e)
  {
    console.log(e)
    res.json(e);
  }
}

module.exports = controller;