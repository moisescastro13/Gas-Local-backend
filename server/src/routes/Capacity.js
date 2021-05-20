const { Router } = require('express');
const router = Router();

const capacityCnt = require('../controllers/Capacity');

router.get('/', capacityCnt.getAllCapacitys)
router.get('/:id', capacityCnt.getOneCapacity)
router.post('/', capacityCnt.newCapacity)
router.put('/:id', capacityCnt.updateCapacity);
router.delete('/:id', capacityCnt.deleteCapacity)

module.exports = router;