const { Router } = require('express');
const router = Router();

const PurchasesCnt = require('../controllers/Purchases');

router.get('/', PurchasesCnt.getAllPurchases);
router.get('/:id', PurchasesCnt.getOnePurchase);
router.post('/', PurchasesCnt.newPurchase);
router.put('/:id',PurchasesCnt.updatePurchase);
router.delete('/:id',PurchasesCnt.deletePurchase);

module.exports = router;