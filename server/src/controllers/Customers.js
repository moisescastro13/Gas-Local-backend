const { Customers, CustomersAddress, CustomersPhoneNumbers, sequelize } = require('../models/index');

const { FormatDataToBulk } = require('../Helpers/Customers');
const controller = {};


controller.newCustomer = async (req, res) => {
  const { name, nit, nrc, state, activity, Addresses, addressDocument, PhoneNumbers } = req.body;

  try {
    if (!Addresses.length) res.json({Error: "Ingresa La direccion"});
    if (!PhoneNumbers.length) res.json({Error: "El numero de telefono"});

    const transaction = await sequelize.transaction(async t => {
      const customer = await Customers.create({ name, nit, nrc, state, activity, addressDocument },{transaction: t});
      let numbers = FormatDataToBulk(PhoneNumbers,customer.id);
      let addresses = FormatDataToBulk(Addresses,customer.id);
      const customersPhoneNumbers = await CustomersPhoneNumbers.bulkCreate(numbers, {transaction: t});
      const customersAddress =await CustomersAddress.bulkCreate(addresses,{transaction: t});

      res.status(200).json({
        customer,
        customersAddress,
        customersPhoneNumbers
      });
    });
  }
  catch (e){
    res.json(e);
  }
}

controller.getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await Customers.findAll({
      where: { IsDelete: false },
      include: [{
        model: CustomersAddress,
        as: "address"
      }, {
        model: CustomersPhoneNumbers,
        as: "phoneNumber"
      }]

    });
    if(!allCustomers) res.json("no existe ningun registro");
    res.status(200).json(allCustomers);
  }
  catch (e) {
    res.json(e);
  }
}

controller.getOneCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    customer = await Customers.findOne({
      where: { id, IsDelete: false},
      include: [{
        model: CustomersAddress,
        as: "address"
      }, {
        model: CustomersPhoneNumbers,
        as: "phoneNumber"
      }]
    });
    if (!customer) res.json({ Err: "El cliente no existe" });
    res.status(200).json(customer);
  }
  catch (e) {
    res.json(e);
  }
}

controller.updateCustomer = async (req, res) => {
  const { name, nit, nrc, state, activity, Addresses, addressDocument, PhoneNumbers } = req.body;
  const id = req.params.id;
  
  const UpdatedCustomer = await Customers.findOne({
    where: { id, IsDelete: false}
  });
  if(!UpdatedCustomer) res.json({"Error": "El cliente no existe"});

  try {
    const transaction = await sequelize.transaction(async t =>{

      const customer = await Customers.update({ name, nit, nrc, state, activity, addressDocument },{ where:{id}, returning : true, transaction: t});
      await CustomersAddress.destroy({where:{CustomerId : id}});
      await CustomersPhoneNumbers.destroy({where:{CustomerId : id}});
      const numbers = FormatDataToBulk(PhoneNumbers,id);
      const addresses = FormatDataToBulk(Addresses,id);
      const customersPhoneNumbers = await CustomersPhoneNumbers.bulkCreate(numbers, {transaction: t});
      const customersAddress = await CustomersAddress.bulkCreate(addresses, {transaction: t});

      res.status(200).json({
        customer,
        Addresses:customersAddress,
        PhoneNumbers:customersPhoneNumbers
      });
    });
  }
  catch (e) {
    res.json(e);
  }
}

controller.deleteCustomer = async (req, res) => {
  const id = req.params.id;
  const DelCustomer = await Customers.findOne({
    where: { id, IsDelete: false}
  });
  if(!DelCustomer) res.json({"Error": "El cliente no existe"});

  try {
    await Customers.update({IsDelete : true}, {where : {id}});
    await CustomersAddress.update({IsDelete : true}, {where : {CustomerId : id}});
    await CustomersPhoneNumbers.update({IsDelete : true}, {where : {CustomerId : id}});

    res.status(200).json({
      "bien" : "todo salio bien v':"
    });
  }
  catch (e) {
    res.json(e);
  }
}


module.exports = controller;