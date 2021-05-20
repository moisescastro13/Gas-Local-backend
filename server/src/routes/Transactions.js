const { Router } = require('express');
const router = Router();

const TranCnt = require('../controllers/Transactions');

router.get('/', TranCnt.getAllTransactions);
/*router.get('/:id', TradeCnt.getOneMark);
router.post('/', TradeCnt.newMark);
router.put('/:id',TradeCnt.updateMark);
router.delete('/:id',TradeCnt.deleteMark); */

module.exports = router;