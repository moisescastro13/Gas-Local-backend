const { TradeMarks } = require('../models/index');
const controller = {};


controller.newMark = async (req, res) => {
  const {  name, description } = req.body;
  try {
    result = await TradeMarks.create({name,description});
    res.status(201).json(result);
  } 
  catch(e) {
    res.json(e);
  }
}

controller.getAllMarks = async (req, res) => {
  try { 
    result = await TradeMarks.findAll({
      where: {IsDelete : false} 
    });
    res.status(200).json(result);
  }
  catch (e)
  {
    res.json(e);
  }
}

controller.getOneMark = async (req, res) => {
  const id = req.params.id;
  try { 
    result = await TradeMarks.findOne({
      where : {
        id,
        IsDelete : false
      }
    });
    if(!result) res.json({Err : "La marca no existe"});
    res.status(200).json(result);
  }
  catch (e){
    res.json(e);
  }
}

controller.updateMark = async (req, res) => {
  const {  name, description } = req.body;
  const id = req.params.id;
  const tradeMark = await TradeMarks.findOne({
    where : {id, IsDelete : false}
  });
  if(!tradeMark) res.json({Err : "La marca no existe"});
  try { 
    result = await TradeMarks.update({ name,description },{ where:{id}, returning : true });
    res.status(200).json(result);
  }
  catch (e)
  {
    res.json(e);
  }
} 

controller.deleteMark = async (req, res) => {
  const id = req.params.id;
  const tradeMark = await TradeMarks.findOne({
    where : {id, IsDelete : false}
  });
  if(!tradeMark) res.json({Err : "La marca no existe"});
  try { 
    result = await TradeMarks.update({ IsDelete: true },{ where:{id} });
    res.status(200).json({result:"OK"});
  }
  catch (e)
  {
    res.json(e);
  }
}

module.exports = controller;