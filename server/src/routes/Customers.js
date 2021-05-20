const { Router } = require('express');
const router = Router();

const customersCnt = require('../controllers/Customers');

router.get('/', customersCnt.getAllCustomers);
router.get('/:id',customersCnt.getOneCustomer);
router.post('/', customersCnt.newCustomer);
router.delete('/:id',customersCnt.deleteCustomer);
router.put('/:id', customersCnt.updateCustomer);

module.exports = router;