const { isEmpty } = require('lodash');
const { Providers } = require('../models/index');

const controller = {};

controller.newProvider = async (req, res) => {
  const { name, contactName, phoneNumber, email } = req.body;
  try {
    result = await Providers.create({ name, contactName, phoneNumber, email });
    res.status(200).json(result);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getAllProviders = async (req, res) => {
  try {
    result = await Providers.findAll({
      where: { IsDelete: false }
    });
    res.status(200).json(result);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getOneProvider = async (req, res) => {
  const id = req.params.id;
  try {
    result = await Providers.findOne({
      where: { id, IsDelete: false }
    });
    if (isEmpty(result)) res.json({ Err: "El proveedor no existe" });
    res.status(200).json(result);
  }
  catch (e) {
    res.json(e);
  }
}

controller.updateProvider = async (req, res) => {
  const { name, contactName, phoneNumber, email } = req.body;
  const id = req.params.id;
  const provider = await Providers.findOne({where: { id, IsDelete: false } });
  if (!provider) res.json({ Err: "El proveedor no existe" });
  try {   
    result = await Providers.update({ name, contactName, phoneNumber, email }, { where: { id }, returning: true });
    res.status(200).json(result);
  }
  catch (e) {
    res.json(e);
  }
}

controller.deleteProvider = async (req, res) => {
  const id = req.params;
  try {
    result = await Providers.update({ IsDelete: true }, { where: id });
    res.status(200).json({result:"OK borrado con exito"});
  }
  catch (e) {
    res.json(e);
  }
}

module.exports = controller;