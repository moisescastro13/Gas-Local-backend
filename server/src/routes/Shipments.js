const { Router } = require('express');
const router = Router();

const shipmentsCnt = require('../controllers/Shipments');

router.get('/', shipmentsCnt.getAllShipments);
router.put('/:id', shipmentsCnt.IsCompleted);

module.exports = router;