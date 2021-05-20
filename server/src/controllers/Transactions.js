const { sequelize, Transactions } = require('../models/index');

const controller = {};

controller.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.findAll({
            where: { Isdelete: false }
        });
        res.status(200).json(transactions);
    } catch (e) {
        res.status(500).json(e);
    }
}


module.exports = controller;