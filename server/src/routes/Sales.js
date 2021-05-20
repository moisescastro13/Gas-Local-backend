const { Router } = require('express');
const router = Router();

const salesCnt = require('../controllers/Sales');

router.get('/', salesCnt.getAllSales);
router.get('/:id', salesCnt.getOneSale);
router.post('/', salesCnt.newSale);
router.put('/:id',salesCnt.updateSale);
router.delete('/:id',salesCnt.deleteSale);

module.exports = router;