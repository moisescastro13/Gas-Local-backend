const { Shipments } = require('../models/index');
const controller = {};

controller.getAllShipments = async (req, res,next) => {
    try {
        shipments = await Shipments.findAll();
        if(!shipments) next();
        res.status(200).json(shipments);
    } catch (e) {
        res.json(e);
    }
}

controller.IsCompleted = async (req, res) => {
    try {
        const { IsCompleted } = req.body;
        const id = req.params.id;
        result = await Shipments.update({ IsCompleted }, { where: { id } });
        if(!result) return res.status(500).json(err);
        res.status(500).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
}

module.exports = controller;