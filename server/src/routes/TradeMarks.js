const { Router } = require('express');
const router = Router();

const TradeCnt = require('../controllers/TradeMarks');

router.get('/', TradeCnt.getAllMarks);
router.get('/:id', TradeCnt.getOneMark);
router.post('/', TradeCnt.newMark);
router.put('/:id',TradeCnt.updateMark);
router.delete('/:id',TradeCnt.deleteMark);

module.exports = router;